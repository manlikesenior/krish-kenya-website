'use client';

import { useEffect } from 'react';
import Script from 'next/script';

interface InstagramEmbedProps {
    username: string;
    url: string;
}

const InstagramEmbed = ({ username, url }: InstagramEmbedProps) => {
    useEffect(() => {
        // Process Instagram embeds after script loads
        if (window.instgrm) {
            window.instgrm.Embeds.process();
        }
    }, []);

    return (
        <>
            <Script
                src="https://www.instagram.com/embed.js"
                strategy="lazyOnload"
                onLoad={() => {
                    if (window.instgrm) {
                        window.instgrm.Embeds.process();
                    }
                }}
            />
            <div className="py-20 bg-[#0a0a0a]">
                <div className="max-w-6xl mx-auto px-4">
                    <h2 className="font-display text-4xl text-white mb-4 text-center tracking-widest border-l-4 border-[#D4AF37] pl-6 inline-block">
                        SOUND AFRIQUE
                    </h2>
                    <p className="text-gray-400 text-center mb-12 mt-4">
                        Follow <a href={url} target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:text-white transition-colors">@{username}</a> on Instagram for the latest updates
                    </p>
                    
                    <div className="flex justify-center">
                        <blockquote 
                            className="instagram-media" 
                            data-instgrm-permalink={url}
                            data-instgrm-version="14"
                            style={{
                                background: '#FFF',
                                border: '1px solid #dbdbdb',
                                borderRadius: '3px',
                                boxShadow: '0 0 1px 0 rgba(0,0,0,0.5), 0 1px 10px 0 rgba(0,0,0,0.15)',
                                margin: '1px',
                                maxWidth: '540px',
                                minWidth: '326px',
                                padding: '0',
                                width: '99.375%',
                            }}
                        >
                            <div style={{ padding: '16px' }}>
                                <a
                                    href={url}
                                    style={{
                                        background: '#FFFFFF',
                                        lineHeight: 0,
                                        padding: '0 0',
                                        textAlign: 'center',
                                        textDecoration: 'none',
                                        width: '100%',
                                    }}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                        <div style={{
                                            backgroundColor: '#F4F4F4',
                                            borderRadius: '50%',
                                            flexGrow: 0,
                                            height: '40px',
                                            marginRight: '14px',
                                            width: '40px',
                                        }}></div>
                                        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'center' }}>
                                            <div style={{
                                                backgroundColor: '#F4F4F4',
                                                borderRadius: '4px',
                                                flexGrow: 0,
                                                height: '14px',
                                                marginBottom: '6px',
                                                width: '100px',
                                            }}></div>
                                            <div style={{
                                                backgroundColor: '#F4F4F4',
                                                borderRadius: '4px',
                                                flexGrow: 0,
                                                height: '14px',
                                                width: '60px',
                                            }}></div>
                                        </div>
                                    </div>
                                    <div style={{ padding: '19% 0' }}></div>
                                    <div style={{ display: 'block', height: '50px', margin: '0 auto 12px', width: '50px' }}></div>
                                    <div style={{ paddingTop: '8px' }}>
                                        <div style={{
                                            color: '#3897f0',
                                            fontFamily: 'Arial,sans-serif',
                                            fontSize: '14px',
                                            fontStyle: 'normal',
                                            fontWeight: 550,
                                            lineHeight: '18px',
                                        }}>
                                            View this profile on Instagram
                                        </div>
                                    </div>
                                    <div style={{ padding: '12.5% 0' }}></div>
                                </a>
                                <p style={{
                                    color: '#c9c8cd',
                                    fontFamily: 'Arial,sans-serif',
                                    fontSize: '14px',
                                    lineHeight: '17px',
                                    marginBottom: 0,
                                    marginTop: '8px',
                                    overflow: 'hidden',
                                    padding: '8px 0 7px',
                                    textAlign: 'center',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                }}>
                                    <a
                                        href={url}
                                        style={{
                                            color: '#c9c8cd',
                                            fontFamily: 'Arial,sans-serif',
                                            fontSize: '14px',
                                            fontStyle: 'normal',
                                            fontWeight: 'normal',
                                            lineHeight: '17px',
                                            textDecoration: 'none',
                                        }}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {username}
                                    </a>
                                </p>
                            </div>
                        </blockquote>
                    </div>
                </div>
            </div>
        </>
    );
};

// Extend Window interface for TypeScript
declare global {
    interface Window {
        instgrm?: {
            Embeds: {
                process: () => void;
            };
        };
    }
}

export default InstagramEmbed;

