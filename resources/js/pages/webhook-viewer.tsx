import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { WebhookResponse } from '@/types/webhook-response';
import { useEffect, useState } from 'react';

const API_SSE_URL = '/api/webhook/stream';
const API_FILE_URL = (filePath: string) => `/storage/${filePath}`;

export default function WebhookViewer() {
    const [documents, setDocuments] = useState<WebhookResponse[]>([]);

    useEffect(() => {
        const eventSource = new EventSource(API_SSE_URL);
        eventSource.onmessage = (event) => {
            const data = JSON.parse(event.data);
            setDocuments((prev) => [data, ...prev]);
        };
        return () => eventSource.close();
    }, []);

    return (
        <ScrollArea className="h-svh p-6">
            <div className="space-y-6">
                {documents.map((doc) => (
                    <Card key={doc.id}>
                        <CardHeader>
                            <CardTitle>{doc.title || doc.name}</CardTitle>
                            <div className="mt-2 flex gap-2">
                                <Badge>{doc.documentStatusCode}</Badge>
                                <Badge variant="secondary">{doc.pageCount} pages</Badge>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <div className="flex flex-col gap-2">
                                <div>
                                    <b>Description:</b> {doc.description}
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
