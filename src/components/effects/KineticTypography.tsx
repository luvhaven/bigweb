'use client'

interface TextSegment {
    text: string
    className?: string
}

interface KineticTypographyProps {
    segments?: TextSegment[]
    text?: string
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div'
    className?: string
    delay?: number
    duration?: number
    splitBy?: 'words' | 'chars'
    stagger?: number
}

export default function KineticTypography({
    segments,
    text,
    as: Tag = 'h2',
    className = '',
}: KineticTypographyProps) {
    const finalSegments = segments || (text ? [{ text }] : [])

    return (
        <Tag
            className={className}
            aria-label={text || segments?.map(s => s.text).join(' ')}
        >
            {finalSegments.map((segment, sIdx) => (
                <span key={sIdx} className={segment.className}>
                    {segment.text}
                </span>
            ))}
        </Tag>
    )
}
