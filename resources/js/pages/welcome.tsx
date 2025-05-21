import { Head } from '@inertiajs/react';
import WebhookViewer from './webhook-viewer';

export default function Welcome() {
    return (
        <>
            <Head title="Webhook Outbound Demo">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            <WebhookViewer />
        </>
    );
}
