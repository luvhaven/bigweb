'use client'

import * as React from "react"
import { Bold, Italic, List, ListOrdered, Link, Image, Quote, Code } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

interface RichTextEditorProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    value: string
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}

export function RichTextEditor({ className, value, onChange, ...props }: RichTextEditorProps) {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null)

    const insertFormat = (startTag: string, endTag: string = '') => {
        const textarea = textareaRef.current
        if (!textarea) return

        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const text = textarea.value
        const before = text.substring(0, start)
        const selection = text.substring(start, end)
        const after = text.substring(end)

        const newValue = `${before}${startTag}${selection}${endTag}${after}`

        // Create a synthetic event to trigger onChange
        const event = {
            target: { value: newValue }
        } as React.ChangeEvent<HTMLTextAreaElement>

        onChange(event)

        // Restore selection
        setTimeout(() => {
            textarea.focus()
            textarea.setSelectionRange(start + startTag.length, end + startTag.length)
        }, 0)
    }

    return (
        <div className={cn("border border-input rounded-md focus-within:ring-2 focus-within:ring-ring", className)}>
            <div className="flex items-center gap-1 p-1 border-b bg-muted/50">
                <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormat('**', '**')}>
                    <Bold className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormat('*', '*')}>
                    <Italic className="h-4 w-4" />
                </Button>
                <div className="w-px h-4 bg-border mx-1" />
                <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormat('- ')}>
                    <List className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormat('1. ')}>
                    <ListOrdered className="h-4 w-4" />
                </Button>
                <div className="w-px h-4 bg-border mx-1" />
                <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormat('> ')}>
                    <Quote className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormat('`', '`')}>
                    <Code className="h-4 w-4" />
                </Button>
                <div className="w-px h-4 bg-border mx-1" />
                <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormat('[', '](url)')}>
                    <Link className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => insertFormat('![alt](', ')')}>
                    <Image className="h-4 w-4" />
                </Button>
            </div>
            <Textarea
                ref={textareaRef}
                value={value}
                onChange={onChange}
                className="border-0 focus-visible:ring-0 rounded-t-none resize-y min-h-[200px]"
                {...props}
            />
        </div>
    )
}
