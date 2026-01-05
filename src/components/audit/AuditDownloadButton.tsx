import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Loader2, Download } from 'lucide-react'
import dynamic from 'next/dynamic'

// Dynamically import PDF components with SSR disabled to prevent build crashes
const PDFDownloadLink = dynamic(
    () => import('@react-pdf/renderer').then((mod) => mod.PDFDownloadLink),
    {
        ssr: false,
        loading: () => (
            <Button size="lg" variant="outline" disabled>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Preparing...
            </Button>
        ),
    }
)

const AuditPDFDocument = dynamic(() => import('./AuditPDFDocument'), { ssr: false })

interface AuditDownloadButtonProps {
    report: any
}

const AuditDownloadButton: React.FC<AuditDownloadButtonProps> = ({ report }) => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        return (
            <Button size="lg" variant="outline" disabled>
                <Download className="w-4 h-4 mr-2" />
                Download Report
            </Button>
        )
    }

    return (
        <PDFDownloadLink
            document={<AuditPDFDocument report={report} />}
            fileName={`BigWeb_Audit_${new URL('https://' + report.url.replace(/^https?:\/\//, '')).hostname}.pdf`}
            className="inline-block"
        >
            {({ blob, url, loading, error }) => (
                <Button
                    size="lg"
                    variant="outline"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Generating PDF...
                        </>
                    ) : (
                        <>
                            <Download className="w-4 h-4 mr-2" />
                            Download Report
                        </>
                    )}
                </Button>
            )}
        </PDFDownloadLink>
    )
}

export default AuditDownloadButton
