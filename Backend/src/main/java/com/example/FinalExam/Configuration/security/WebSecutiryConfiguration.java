package com.example.FinalExam.Configuration.security;

import java.util.Arrays;

import com.example.FinalExam.Configuration.exception.AuthExceptionHandler;
import com.example.FinalExam.Service.Account.IAccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;



@Component
@EnableWebSecurity
public class WebSecutiryConfiguration extends WebSecurityConfigurerAdapter {



	@Autowired
	private AuthExceptionHandler authExceptionHandler;

	@Autowired
	@Lazy
	private IAccountService accountService;

	@Bean
	public PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	@Override
	protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(accountService).passwordEncoder(passwordEncoder());
	}



	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
		.cors()
		.and()
		.exceptionHandling()
        .authenticationEntryPoint(authExceptionHandler)
        .accessDeniedHandler(authExceptionHandler)
        .and()
		.authorizeRequests()

				.antMatchers(HttpMethod.GET, "/api/v1/accounts").hasAuthority("ADMIN")
				.antMatchers(HttpMethod.POST, "/api/v1/accounts").permitAll()
				.antMatchers(HttpMethod.PUT, "/api/v1/accounts/{id}").hasAuthority("ADMIN")
				.antMatchers(HttpMethod.DELETE, "/api/v1/accounts/{id}").hasAuthority("ADMIN")

				.antMatchers(HttpMethod.GET, "/api/v1/keyboard").permitAll()
				.antMatchers(HttpMethod.POST, "/api/v1/keyboard").hasAuthority("ADMIN")
				.antMatchers(HttpMethod.PUT, "/api/v1/keyboard/{id}").hasAuthority("ADMIN")
				.antMatchers(HttpMethod.DELETE, "/api/v1/keyboard/{id}").hasAuthority("ADMIN")

				.anyRequest().authenticated()
			.and()
			.httpBasic()
			.and()
			.csrf().disable();
	}
	
	@Bean
    public CorsConfigurationSource corsConfigurationSource() {
		final CorsConfiguration configuration = new CorsConfiguration();
	    configuration.setAllowedMethods(Arrays.asList("HEAD", "GET", "POST", "PUT", "DELETE"));
	    configuration.applyPermitDefaultValues();
	    
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

}
