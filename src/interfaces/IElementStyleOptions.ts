import {TextAlign} from "../enums/TextAlign";
import {Color} from "../enums/Color";

export interface IElementStyleOptions {
    color?: Color | string;
    backgroundColor?: Color | string;
    width?: string;
    height?: string;
    padding?: string;
    margin?: string;
    fontSize?: string;
    textAlign?: TextAlign;
    display?: string;
    border?: string;
    borderRadius?: string;
    boxShadow?: string;
    overflow?: string;
    zIndex?: string;
    opacity?: string;
}