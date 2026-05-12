
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Trash2, Plus } from 'lucide-react'

interface JsonListEditorProps {
    items: any[]
    onChange: (items: any[]) => void
    fields: { key: string; label: string; type: 'text' | 'textarea' }[]
    title: string
}

export default function JsonListEditor({ items, onChange, fields, title }: JsonListEditorProps) {
    const addItem = () => {
        const newItem: any = {}
        fields.forEach(f => newItem[f.key] = '')
        onChange([...items, newItem])
    }

    const updateItem = (index: number, key: string, value: string) => {
        const newItems = [...items]
        newItems[index] = { ...newItems[index], [key]: value }
        onChange(newItems)
    }

    const removeItem = (index: number) => {
        onChange(items.filter((_, i) => i !== index))
    }

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">{title}</Label>
                <Button onClick={addItem} size="sm" variant="outline" type="button">
                    <Plus className="w-4 h-4 mr-2" /> Add Item
                </Button>
            </div>

            <div className="space-y-4">
                {items?.map((item, index) => (
                    <div key={index} className="p-4 border rounded-lg bg-card relative group">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:bg-destructive/10"
                            onClick={() => removeItem(index)}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>

                        <div className="space-y-3 pr-8">
                            {fields.map(field => (
                                <div key={field.key} className="space-y-1">
                                    <Label className="text-xs text-muted-foreground uppercase tracking-wider">{field.label}</Label>
                                    {field.type === 'textarea' ? (
                                        <Textarea
                                            value={item[field.key] || ''}
                                            onChange={e => updateItem(index, field.key, e.target.value)}
                                            rows={2}
                                            className="resize-none"
                                        />
                                    ) : (
                                        <Input
                                            value={item[field.key] || ''}
                                            onChange={e => updateItem(index, field.key, e.target.value)}
                                        />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}

                {items?.length === 0 && (
                    <div className="text-center py-6 border-2 border-dashed rounded-lg text-muted-foreground text-sm">
                        No items added.
                    </div>
                )}
            </div>
        </div>
    )
}
