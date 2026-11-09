import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import QRCodeStyling from 'qr-code-styling';
import { Download, X, Copy, Check, Heart, Sparkles, RefreshCw, Link as LinkIcon, Globe, Monitor } from 'lucide-react';
import { motion } from 'framer-motion';

interface HeartQRGeneratorProps {
  url: string;
  recipientName: string;
  onClose: () => void;
}

// Crisp Heart Icon SVG for QR center emblem
const HEART_EMBLEM_SVG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100" height="100">
  <circle cx="50" cy="50" r="46" fill="#1d4ed8" stroke="#ffffff" stroke-width="7"/>
  <path d="M 50,72 C 30,55 18,41 18,29 C 18,19 26,13 36,13 C 43,13 47,17 50,22 C 53,17 57,13 64,13 C 74,13 82,19 82,29 C 82,41 70,55 50,72 Z" fill="#ffffff"/>
</svg>
`)}`;

export const HeartQRGenerator: React.FC<HeartQRGeneratorProps> = ({
  url: initialUrl,
  recipientName,
  onClose,
}) => {
  // Strip any long hashes or invalid fragments
  const sanitizeUrl = (raw: string) => {
    try {
      if (!raw) return 'http://apaya.buildwithyoga.my.id/';
      // Remove any hash completely to prevent QR code data overflow
      const clean = raw.split('#')[0].trim();
      return clean || 'http://apaya.buildwithyoga.my.id/';
    } catch {
      return 'http://apaya.buildwithyoga.my.id/';
    }
  };

  const [currentUrl, setCurrentUrl] = useState(() => sanitizeUrl(initialUrl));
  const [copied, setCopied] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [fallbackDataUrl, setFallbackDataUrl] = useState<string>('');

  const qrContainerRef = useRef<HTMLDivElement | null>(null);
  const qrStylingRef = useRef<QRCodeStyling | null>(null);
  const canvasExportRef = useRef<HTMLCanvasElement | null>(null);

  // Sync when initialUrl prop updates
  useEffect(() => {
    if (initialUrl) {
      setCurrentUrl(sanitizeUrl(initialUrl));
    }
  }, [initialUrl]);

  // Main generator effect
  useEffect(() => {
    let isCancelled = false;

    const renderQR = async () => {
      setIsGenerating(true);
      const cleanTarget = sanitizeUrl(currentUrl);

      // 1. Generate guaranteed fast fallback data URL via qrcode library
      try {
        const standardQr = await QRCode.toDataURL(cleanTarget, {
          errorCorrectionLevel: 'H',
          margin: 1,
          width: 480,
          color: {
            dark: '#0a1d47',
            light: '#ffffff',
          },
        });
        if (!isCancelled) {
          setFallbackDataUrl(standardQr);
        }
      } catch (e) {
        console.warn('Fallback QR error:', e);
      }

      // 2. Render gorgeous styled QR with qr-code-styling if DOM container is ready
      try {
        if (typeof window !== 'undefined' && qrContainerRef.current) {
          const qrStyling = new QRCodeStyling({
            width: 220,
            height: 220,
            type: 'canvas',
            data: cleanTarget,
            margin: 4,
            qrOptions: {
              typeNumber: 0,
              mode: 'Byte',
              errorCorrectionLevel: 'Q',
            },
            image: HEART_EMBLEM_SVG,
            imageOptions: {
              hideBackgroundDots: true,
              imageSize: 0.34,
              margin: 3,
              crossOrigin: 'anonymous',
            },
            dotsOptions: {
              type: 'classy-rounded',
              color: '#0e2a5e',
              gradient: {
                type: 'linear',
                rotation: 45,
                colorStops: [
                  { offset: 0, color: '#091c42' },
                  { offset: 1, color: '#1d4ed8' },
                ],
              },
            },
            cornersSquareOptions: {
              type: 'extra-rounded',
              color: '#1e40af',
            },
            cornersDotOptions: {
              type: 'dot',
              color: '#e11d48', // Charming romantic rose dot
            },
            backgroundOptions: {
              color: '#ffffff',
            },
          });

          qrContainerRef.current.innerHTML = '';
          qrStyling.append(qrContainerRef.current);
          qrStylingRef.current = qrStyling;
        }
      } catch (err) {
        console.warn('QRCodeStyling render error, using fallback:', err);
      } finally {
        if (!isCancelled) {
          setIsGenerating(false);
        }
      }
    };

    renderQR();

    return () => {
      isCancelled = true;
    };
  }, [currentUrl]);

  // Handle PNG Download with high-resolution 1200x1200px artwork poster
  const handleDownloadArtwork = async () => {
    try {
      const cleanTarget = sanitizeUrl(currentUrl);
      const canvas = canvasExportRef.current || document.createElement('canvas');
      const size = 1200;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // 1. Midnight Starry Gradient Background
      const bg = ctx.createRadialGradient(size / 2, size / 2, 100, size / 2, size / 2, size * 0.75);
      bg.addColorStop(0, '#10275a');
      bg.addColorStop(0.55, '#071536');
      bg.addColorStop(1, '#020617');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, size, size);

      // 2. Celestial Twinkling Stardust
      ctx.fillStyle = '#ffffff';
      for (let i = 0; i < 65; i++) {
        const sx = (Math.sin(i * 47) * 0.5 + 0.5) * size;
        const sy = (Math.cos(i * 83) * 0.5 + 0.5) * size;
        const r = (i % 3) + 1;
        ctx.globalAlpha = 0.25 + (i % 5) * 0.15;
        ctx.beginPath();
        ctx.arc(sx, sy, r, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1.0;

      // 3. Smooth Bezier Heart Path Helper
      const drawHeart = (c: CanvasRenderingContext2D, cx: number, cy: number, w: number, h: number) => {
        c.beginPath();
        const topH = h * 0.32;
        c.moveTo(cx, cy + topH);
        c.bezierCurveTo(cx, cy, cx - w / 2, cy, cx - w / 2, cy + topH);
        c.bezierCurveTo(cx - w / 2, cy + (h + topH) / 2, cx, cy + (h + topH) / 1.35, cx, cy + h);
        c.bezierCurveTo(cx, cy + (h + topH) / 1.35, cx + w / 2, cy + (h + topH) / 2, cx + w / 2, cy + topH);
        c.bezierCurveTo(cx + w / 2, cy, cx, cy, cx, cy + topH);
        c.closePath();
      };

      const heartX = size / 2;
      const heartY = size * 0.11;
      const heartW = size * 0.78;
      const heartH = size * 0.72;

      // 4. Outer Soft Glow
      ctx.save();
      drawHeart(ctx, heartX, heartY, heartW + 36, heartH + 36);
      ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
      ctx.shadowColor = '#60a5fa';
      ctx.shadowBlur = 45;
      ctx.fill();
      ctx.restore();

      // 5. White Heart Sculpted Card
      ctx.save();
      drawHeart(ctx, heartX, heartY + 4, heartW, heartH);
      ctx.fillStyle = '#ffffff';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
      ctx.shadowBlur = 25;
      ctx.fill();
      ctx.restore();

      // 6. Draw QR Code inside Heart Center
      const qrSize = size * 0.46;
      const qrX = (size - qrSize) / 2;
      const qrY = heartY + (heartH - qrSize) / 2 + 10;

      // Get high-res QR image
      let qrImgSource: HTMLImageElement | null = null;
      if (qrStylingRef.current) {
        try {
          const blob = await qrStylingRef.current.getRawData('png');
          if (blob && typeof Blob !== 'undefined' && blob instanceof Blob) {
            const blobUrl = URL.createObjectURL(blob);
            const img = new Image();
            img.src = blobUrl;
            await new Promise<void>((resolve) => {
              if (img.complete) return resolve();
              img.onload = () => resolve();
              img.onerror = () => resolve();
            });
            qrImgSource = img;
          }
        } catch {}
      }

      // If styling blob isn't available, use standard qr fallback
      if (!qrImgSource && fallbackDataUrl) {
        const img = new Image();
        img.src = fallbackDataUrl;
        await new Promise<void>((resolve) => {
          if (img.complete) return resolve();
          img.onload = () => resolve();
          img.onerror = () => resolve();
        });
        qrImgSource = img;
      }

      if (qrImgSource) {
        ctx.save();
        ctx.drawImage(qrImgSource, qrX, qrY, qrSize, qrSize);

        // Center Heart Emblem
        const logoSize = qrSize * 0.22;
        const logoX = qrX + (qrSize - logoSize) / 2;
        const logoY = qrY + (qrSize - logoSize) / 2;

        ctx.beginPath();
        ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2 + 3, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(logoX + logoSize / 2, logoY + logoSize / 2, logoSize / 2 - 1, 0, Math.PI * 2);
        ctx.fillStyle = '#1d4ed8';
        ctx.fill();

        const hw = logoSize * 0.58;
        const hh = logoSize * 0.54;
        const hx = logoX + (logoSize - hw) / 2 + hw / 2;
        const hy = logoY + (logoSize - hh) / 2 + 2;
        drawHeart(ctx, hx, hy, hw, hh);
        ctx.fillStyle = '#ffffff';
        ctx.fill();
        ctx.restore();
      }

      // 7. Typography
      ctx.textAlign = 'center';
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 36px "Playfair Display", Georgia, serif';
      ctx.fillText(`Special Gift for ${recipientName || 'You'}`, size / 2, size * 0.91);

      ctx.fillStyle = '#93b5f3';
      ctx.font = '22px Inter, system-ui, sans-serif';
      ctx.fillText('Pindai dengan Google Lens atau Kamera HP', size / 2, size * 0.95);

      // Trigger download
      const downloadUri = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = downloadUri;
      a.download = `Heart-QR-Gift-${(recipientName || 'Birthday').replace(/\s+/g, '_')}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (e) {
      console.error('Download error:', e);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const setCloudflarePreset = () => {
    setCurrentUrl('http://apaya.buildwithyoga.my.id/');
  };

  const setLocalPreset = () => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(`${window.location.origin}${window.location.pathname}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 15 }}
        className="relative w-full max-w-sm glass-panel-luxury rounded-3xl p-5 sm:p-6 border border-navy-400/40 shadow-2xl text-center select-none"
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-navy-800/80 text-navy-300 hover:text-white hover:bg-navy-700 transition-colors"
          title="Tutup Modal"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center justify-center gap-1.5 text-blue-300 mb-1">
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
          <span className="font-mono text-xs tracking-widest uppercase font-semibold">
            Heart QR Code Generator
          </span>
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400 animate-pulse" />
        </div>
        <h3 className="font-serif text-2xl font-bold text-white mb-2">
          Romantic Heart QR
        </h3>

        {/* Sculpted Smooth Love Heart Frame */}
        <div className="relative w-64 h-64 sm:w-72 sm:h-72 mx-auto my-3 flex items-center justify-center">
          {/* Smooth Mathematical Bezier SVG Heart Container */}
          <svg
            viewBox="0 0 100 92"
            className="absolute inset-0 w-full h-full drop-shadow-[0_0_35px_rgba(96,143,230,0.55)]"
          >
            <defs>
              <linearGradient id="heartCardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="50%" stopColor="#f8fafc" />
                <stop offset="100%" stopColor="#eef2f6" />
              </linearGradient>
              <linearGradient id="heartBorderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60a5fa" />
                <stop offset="50%" stopColor="#f43f5e" />
                <stop offset="100%" stopColor="#fbbf24" />
              </linearGradient>
            </defs>
            <path
              d="M 50,88 C 20,60 5,42 5,26 C 5,12 16,3 30,3 C 39,3 46,7.5 50,14 C 54,7.5 61,3 70,3 C 84,3 95,12 95,26 C 95,42 80,60 50,88 Z"
              fill="url(#heartCardGrad)"
              stroke="url(#heartBorderGrad)"
              strokeWidth="1.6"
            />
          </svg>

          {/* Floating Ribbon at top of Heart */}
          <div className="absolute top-3.5 z-20 px-3 py-0.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-600 text-[10px] font-bold text-white tracking-wider uppercase shadow-md border border-white/50 flex items-center gap-1">
            <Heart className="w-2.5 h-2.5 fill-white text-white" />
            <span>Scan with Love</span>
            <Heart className="w-2.5 h-2.5 fill-white text-white" />
          </div>

          {/* Center Scannable QR Code */}
          <div className="relative z-10 w-44 h-44 sm:w-48 sm:h-48 flex items-center justify-center bg-white p-2 rounded-2xl shadow-inner border border-slate-200 mt-2">
            {/* Primary Styled QR Container via qr-code-styling */}
            <div
              ref={qrContainerRef}
              className="w-full h-full flex items-center justify-center [&>canvas]:max-w-full [&>canvas]:max-h-full [&>canvas]:rounded-lg"
            />

            {/* Fallback Display if qr-code-styling is still drawing */}
            {!qrContainerRef.current?.hasChildNodes() && fallbackDataUrl && (
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={fallbackDataUrl}
                  alt="Heart QR Code"
                  className="w-full h-full object-contain rounded-lg"
                />
                <div className="absolute inset-0 m-auto w-9 h-9 rounded-full bg-blue-600 border-2 border-white shadow-md flex items-center justify-center pointer-events-none">
                  <Heart className="w-4 h-4 text-white fill-white" />
                </div>
              </div>
            )}
          </div>

          {/* Bottom Love Inscription inside Heart */}
          <div className="absolute bottom-4 z-20 text-[11px] font-serif font-bold text-navy-900 tracking-wide drop-shadow-sm flex items-center gap-1">
            <span>For {recipientName || 'You'}</span>
            <Sparkles className="w-3 h-3 text-amber-500 inline" />
          </div>

          {/* Twinkling Sparkle Accent */}
          <div className="absolute top-2 right-6 z-20">
            <Sparkles className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <div className="absolute bottom-6 left-6 z-20">
            <Sparkles className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
          </div>
        </div>

        {/* Hidden Canvas for High-Resolution 1200x1200px PNG Export */}
        <canvas ref={canvasExportRef} className="hidden" />

        {/* Preset URL Selection Chips */}
        <div className="my-2 flex items-center justify-center gap-1.5 flex-wrap">
          <button
            type="button"
            onClick={setCloudflarePreset}
            className={`px-2.5 py-1 rounded-full text-[10px] font-medium flex items-center gap-1 transition-all border ${
              currentUrl.includes('apaya.buildwithyoga.my.id')
                ? 'bg-blue-600 text-white border-blue-400 shadow-sm shadow-blue-500/50'
                : 'bg-navy-800/80 text-navy-300 border-navy-600 hover:text-white hover:bg-navy-700'
            }`}
          >
            <Globe className="w-3 h-3" />
            <span>Cloudflare Tunnel Domain</span>
          </button>

          <button
            type="button"
            onClick={setLocalPreset}
            className={`px-2.5 py-1 rounded-full text-[10px] font-medium flex items-center gap-1 transition-all border ${
              !currentUrl.includes('apaya.buildwithyoga.my.id')
                ? 'bg-blue-600 text-white border-blue-400 shadow-sm shadow-blue-500/50'
                : 'bg-navy-800/80 text-navy-300 border-navy-600 hover:text-white hover:bg-navy-700'
            }`}
          >
            <Monitor className="w-3 h-3" />
            <span>Domain Saat Ini</span>
          </button>
        </div>

        {/* Link Input */}
        <div className="my-2.5 text-left">
          <label className="text-[11px] font-medium text-navy-300 flex items-center justify-between mb-1">
            <span className="flex items-center gap-1">
              <LinkIcon className="w-3 h-3 text-blue-400" />
              Tautan Website (Target Scan):
            </span>
            <button
              type="button"
              onClick={() => setCurrentUrl(sanitizeUrl(currentUrl))}
              className="text-blue-300 hover:text-white flex items-center gap-1 text-[10px]"
              title="Perbarui QR Code"
            >
              <RefreshCw className={`w-3 h-3 ${isGenerating ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </label>
          <div className="relative">
            <input
              type="text"
              value={currentUrl}
              onChange={(e) => setCurrentUrl(e.target.value)}
              placeholder="http://apaya.buildwithyoga.my.id/"
              className="w-full bg-navy-950 border border-navy-600 rounded-lg px-2.5 py-1.5 text-xs text-navy-100 font-mono truncate focus:outline-none focus:border-blue-400"
            />
          </div>
          <p className="text-[10px] text-navy-400 mt-1">
            QR Code dibuat otomatis dan 100% cepat dipindai langsung dengan kamera HP / Google Lens.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 mt-3">
          {/* Download Button */}
          <button
            type="button"
            onClick={handleDownloadArtwork}
            disabled={isGenerating}
            className="w-full py-2.5 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-rose-600 hover:from-blue-500 hover:to-rose-500 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/30 transition-transform active:scale-95 disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>Unduh Gambar Heart QR (PNG)</span>
          </button>

          {/* Copy Link Button */}
          <button
            type="button"
            onClick={handleCopy}
            className="w-full py-2 rounded-full bg-navy-800 hover:bg-navy-700 border border-navy-500/50 text-navy-200 font-medium text-xs flex items-center justify-center gap-1.5 transition-colors"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Tautan Berhasil Disalin!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-navy-300" />
                <span>Salin Tautan Website</span>
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
};
