import { EnumType } from "typescript"

export interface QueryFilters{
    name?:string,
    type?:OptionsType,
    isPromotion?:boolean,
    priceFrom?:string,
    priceTo?:string,
    orderBy?:'name'|'price'|'type'|'discount'
    orderDirection?:'asc'|'desc'
}

export interface MappedFilters{
    name:{$regex:string, $options:any },
    type:string,
    isPromotion:boolean,
    priceFrom:{$gte?:number}
    priceTo:{$lte?:number}
}

export type OptionsType = 'burger' | 'condiments' | 'snacks' | 'drinks';