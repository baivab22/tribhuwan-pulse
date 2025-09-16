import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { trackSuggestion } from '@/lib/api';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const { t } = useTranslation();
  const [trackId, setTrackId] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<null | {
    id: string;
    status: string;
    category: string;
    createdAt: string;
    updatedAt: string;
  }>(null);
  const [error, setError] = useState<string | null>(null);

  async function onTrack() {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const data = await trackSuggestion(trackId.trim());
      setResult(data.suggestion);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : String(t('home.notFound'));
      setError(msg);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-[calc(100vh-56px)] bg-gradient-to-br from-slate-50 to-blue-50">
      <section className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">{t('home.headline')}</h1>
          <p className="text-muted-foreground">{t('home.sub')}</p>
          <div className="flex gap-2">
            <Link to="/submit"><Button>{t('nav.submit')}</Button></Link>
            <Link to="/public"><Button variant="outline">{t('nav.public')}</Button></Link>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>{t('home.trackTitle')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input
              placeholder={t('home.placeholderId') || 'ID'}
              value={trackId}
              onChange={(e) => setTrackId(e.target.value)}
            />
            <Button onClick={onTrack} disabled={!trackId || loading}>
              {loading ? '...' : t('home.checkStatus')}
            </Button>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
            {result ? (
              <div className="text-sm space-y-1">
                <div><strong>{t('home.status')}:</strong> {result.status}</div>
                <div><strong>{t('home.category')}:</strong> {result.category}</div>
                <div><strong>{t('home.createdAt')}:</strong> {new Date(result.createdAt).toLocaleString()}</div>
                <div><strong>{t('home.updatedAt')}:</strong> {new Date(result.updatedAt).toLocaleString()}</div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </section>

      <section className="max-w-6xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-semibold mb-6">{t('home.quickLinks')}</h2>
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader><CardTitle>Anonymous or Identified</CardTitle></CardHeader>
            <CardContent>Choose to submit anonymously or with your account. Your privacy is respected.</CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Attach Media</CardTitle></CardHeader>
            <CardContent>Enhance your suggestion with photos and videos for more context.</CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Track & Transparency</CardTitle></CardHeader>
            <CardContent>Track status anytime and view resolved suggestions on the public board.</CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Bilingual</CardTitle></CardHeader>
            <CardContent>Switch between English and Nepali with one click.</CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Mobile Friendly</CardTitle></CardHeader>
            <CardContent>Responsive design works across phones, tablets, and desktops.</CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>Admin Insights</CardTitle></CardHeader>
            <CardContent>Admins get dashboards to manage, categorize, and analyze trends.</CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}