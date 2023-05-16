import {Slot} from "@radix-ui/react-slot"
import { ButtonHTMLAttributes, ReactNode } from "react";
import {clsx} from "clsx";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children : ReactNode,
    asChild ?: boolean,
    className ?: string 
}

function AltButton({children, asChild,className, ...props} : ButtonProps){
    const Comp = asChild ? Slot : "button";
    return (
        <Comp className={clsx( "py-3 px-4  bg-red-200 rounded font-semibold text-black text-sm w-full transition-colors hover:bg-red-100 focus:ring-2 ring-white", className)} {...props}>{children}</Comp>
    )
}

export default AltButton;

