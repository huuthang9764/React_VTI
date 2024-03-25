import {Children}  from 'react'

export const Each = ({render , of})=>{
    Array.isArray(of) &&
Children.toArray(of.map((item, index)=> render(item, index)))};