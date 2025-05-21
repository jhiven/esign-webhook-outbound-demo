import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { WebhookResponse } from '@/types/webhook-response';
import { useEffect, useState } from 'react';

const API_URL = '/api/webhook/documents';
const API_FILE_URL = (filePath: string) => `/storage/${filePath}`;

export default function WebhookViewer() {
    const [documents, setDocuments] = useState<WebhookResponse[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchDocuments = async () => {
        setLoading(true);
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            setDocuments(Array.isArray(data) ? data : []);
        } finally {
            setLoading(false);
        }
    };

    const deleteDocument = async (id: string) => {
        await fetch(`/api/webhook/documents/${id}`, { method: 'DELETE' });
        setDocuments((prev) => prev.filter((doc) => doc.Id !== id));
    };
    const deleteAllDocuments = async () => {
        await fetch('/api/webhook/documents', { method: 'DELETE' });
        setDocuments([]);
    };

    useEffect(() => {
        fetchDocuments();
    }, []);

    return (
        <ScrollArea className="h-svh p-6">
            <div className="mb-4 flex items-center justify-between">
                <span className="text-lg font-semibold">Webhook Documents</span>
                <div className="flex gap-2">
                    <Button onClick={fetchDocuments} disabled={loading}>
                        {loading ? 'Refreshing...' : 'Refresh'}
                    </Button>
                    <Button variant="destructive" onClick={deleteAllDocuments} disabled={loading || documents.length === 0}>
                        Delete All
                    </Button>
                </div>
            </div>
            <div className="space-y-6">
                {documents.map((doc) => (
                    <Card key={doc.Id}>
                        <CardHeader className="flex flex-row items-center justify-between gap-2">
                            <div>
                                <CardTitle>Document: {doc.Title || doc.Name || '-'}</CardTitle>
                                <div className="mt-2 flex gap-2">
                                    <Badge>{doc.DocumentStatusCode}</Badge>
                                    <Badge variant="secondary">{doc.PageCount} pages</Badge>
                                </div>
                            </div>
                            <Button variant="destructive" size="sm" onClick={() => deleteDocument(doc.Id)}>
                                Delete
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-2">
                                <div>
                                    <b>Description:</b> {doc.Description}
                                </div>
                                <div>
                                    <b>File:</b>{' '}
                                    {doc.filePath ? (
                                        <a
                                            href={API_FILE_URL(doc.filePath)}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline"
                                        >
                                            Download PDF
                                        </a>
                                    ) : (
                                        'No file'
                                    )}
                                </div>
                                <div>
                                    <b>Metadata:</b>
                                    <pre className="bg-muted overflow-x-auto rounded p-2 text-xs">{JSON.stringify(doc, null, 2)}</pre>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
                {documents.length === 0 && <div className="text-muted-foreground text-center">No documents received yet.</div>}
            </div>
        </ScrollArea>
    );
}
