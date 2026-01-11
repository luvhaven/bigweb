import React from 'react'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

interface AuditDownloadButtonProps {
    report: any
}

const AuditDownloadButton: React.FC<AuditDownloadButtonProps> = ({ report }) => {
    return (
        <Button size="lg" variant="outline" disabled title="Feature unavailable completely">
            <Download className="w-4 h-4 mr-2" />
            Download Report (Disabled)
        </Button>
    )
}

export default AuditDownloadButton
