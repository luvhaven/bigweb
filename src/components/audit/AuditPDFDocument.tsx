import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';

// Register a standard font if needed, but Helvetica is default and safe.

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 40,
        fontFamily: 'Helvetica',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 40,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 20,
    },
    brandName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#8B5CF6', // Accent purple
    },
    brandSub: {
        fontSize: 10,
        color: '#666',
    },
    titleSection: {
        marginTop: 100,
        marginBottom: 60,
        textAlign: 'center',
    },
    reportTitle: {
        fontSize: 36,
        fontWeight: 'heavy',
        color: '#111',
        marginBottom: 20,
    },
    urlText: {
        fontSize: 18,
        color: '#666',
        marginBottom: 10,
    },
    dateText: {
        fontSize: 12,
        color: '#999',
    },
    scoreCircle: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#f8fafc',
        borderWidth: 4,
        borderColor: '#8B5CF6',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 40,
    },
    scoreText: {
        fontSize: 48,
        fontWeight: 'bold',
        color: '#8B5CF6',
    },
    scoreLabel: {
        fontSize: 12,
        color: '#666',
        marginTop: 5,
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1,
    },
    categoryBreakdown: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginTop: 40,
    },
    categoryCard: {
        width: '30%',
        backgroundColor: '#f8fafc',
        padding: 15,
        borderRadius: 8,
        marginBottom: 20,
        alignItems: 'center',
    },
    catScore: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    catLabel: {
        fontSize: 10,
        color: '#666',
        uppercase: true,
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        textAlign: 'center',
        color: '#999',
        fontSize: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 10,
    },
    detailPage: {
        padding: 40,
    },
    sectionTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#111',
        borderBottomWidth: 2,
        borderBottomColor: '#8B5CF6',
        paddingBottom: 5,
    },
    issueRow: {
        flexDirection: 'row',
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#fff',
        borderLeftWidth: 3,
    },
    severityCritical: { borderLeftColor: '#ef4444', backgroundColor: '#fef2f2' },
    severityWarning: { borderLeftColor: '#f97316', backgroundColor: '#fff7ed' },
    severityInfo: { borderLeftColor: '#3b82f6', backgroundColor: '#eff6ff' },

    issueContent: { flex: 1, paddingLeft: 10 },
    issueMsg: { fontSize: 12, fontWeight: 'bold', color: '#333', marginBottom: 4 },
    issueRec: { fontSize: 10, color: '#666' },
    severityBadge: { fontSize: 8, fontWeight: 'bold', textTransform: 'uppercase', marginBottom: 4 },
});

// Helper to determine color based on score
const getScoreColor = (score: number) => {
    if (score >= 90) return '#22c55e';
    if (score >= 70) return '#eab308';
    if (score >= 50) return '#f97316';
    return '#ef4444';
};

interface AuditPDFProps {
    report: any; // Using any for simplicity with the passed report object
}

const AuditPDFDocument: React.FC<AuditPDFProps> = ({ report }) => {
    const categories = [
        { label: 'Performance', data: report.categories.performance },
        { label: 'SEO', data: report.categories.seo },
        { label: 'UI/UX', data: report.categories.ui },
        { label: 'Accessibility', data: report.categories.accessibility },
        { label: 'Security', data: report.categories.security },
        { label: 'Content', data: report.categories.content },
    ];

    return (
        <Document>
            {/* Cover Page */}
            <Page size="A4" style={styles.page}>
                <View style={styles.header}>
                    <View>
                        <Text style={styles.brandName}>BigWeb</Text>
                        <Text style={styles.brandSub}>Digital Growth Agency</Text>
                    </View>
                    <Text style={{ fontSize: 10, color: '#999' }}>{new Date().toLocaleDateString()}</Text>
                </View>

                <View style={styles.titleSection}>
                    <Text style={styles.reportTitle}>Website Audit Report</Text>
                    <Text style={styles.urlText}>{report.url}</Text>
                    <Text style={styles.dateText}>Generated on {new Date(report.timestamp).toLocaleString()}</Text>
                </View>

                <View style={[styles.scoreCircle, { borderColor: getScoreColor(report.overallScore) }]}>
                    <Text style={[styles.scoreText, { color: getScoreColor(report.overallScore) }]}>
                        {report.overallScore}
                    </Text>
                    <Text style={styles.scoreLabel}>Overall Score</Text>
                </View>

                <View style={styles.categoryBreakdown}>
                    {categories.map((cat, idx) => (
                        <View key={idx} style={styles.categoryCard}>
                            <Text style={[styles.catScore, { color: getScoreColor(cat.data.score) }]}>
                                {cat.data.score}
                            </Text>
                            <Text style={styles.catLabel}>{cat.label}</Text>
                        </View>
                    ))}
                </View>

                <Text style={styles.footer}>
                    BigWeb Inc. | www.bigweb.com | Expert Digital Audits
                </Text>
            </Page>

            {/* Detailed Pages */}
            {categories.map((cat, idx) => (
                <Page key={idx} size="A4" style={styles.page}>
                    <View style={styles.header}>
                        <Text style={{ fontSize: 12, color: '#999' }}>Audit Details</Text>
                        <Text style={{ fontSize: 12, color: '#111' }}>{cat.label}</Text>
                    </View>

                    <Text style={styles.sectionTitle}>{cat.label} Analysis</Text>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                        <Text style={{ fontSize: 14, color: '#666', marginRight: 10 }}>Category Score:</Text>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', color: getScoreColor(cat.data.score) }}>
                            {cat.data.score}/100
                        </Text>
                    </View>

                    {/* Issues List */}
                    {cat.data.issues.length > 0 ? (
                        cat.data.issues.map((issue: any, i: number) => (
                            <View key={i} style={[
                                styles.issueRow,
                                issue.severity === 'critical' ? styles.severityCritical :
                                    issue.severity === 'warning' ? styles.severityWarning :
                                        styles.severityInfo
                            ]}>
                                <View style={styles.issueContent}>
                                    <Text style={[styles.severityBadge, {
                                        color: issue.severity === 'critical' ? '#ef4444' :
                                            issue.severity === 'warning' ? '#f97316' : '#3b82f6'
                                    }]}>
                                        {issue.severity}
                                    </Text>
                                    <Text style={styles.issueMsg}>{issue.message}</Text>
                                    <Text style={styles.issueRec}> Recommendation: {issue.recommendation}</Text>
                                </View>
                            </View>
                        ))
                    ) : (
                        <View style={{ padding: 20, backgroundColor: '#f0fdf4', borderRadius: 8 }}>
                            <Text style={{ color: '#15803d', textAlign: 'center' }}>
                                Excellent! No critical issues found in this category.
                            </Text>
                        </View>
                    )}

                    <Text style={styles.footer}>
                        Page {idx + 2} | BigWeb Audit Report
                    </Text>
                </Page>
            ))}
        </Document>
    );
};

export default AuditPDFDocument;
