import React, { useState } from 'react';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { RenderGoToPageProps, pageNavigationPlugin } from '@react-pdf-viewer/page-navigation';
import { useLocation } from 'react-router-dom';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/page-navigation/lib/styles/index.css';

const App = () => {
    const location = useLocation();
    const urlParams = new URLSearchParams(location.search);
    const fileName = urlParams.get('file');

    const pageNavigationPluginInstance = pageNavigationPlugin();
    const { GoToNextPage, GoToPreviousPage, jumpToPage } = pageNavigationPluginInstance;
    
    // Initialize fileUrl state with an empty string
    const [fileUrl, setFileUrl] = useState<string>('');

    // Load the fileUrl when fileName is not null
    React.useEffect(() => {
        if (fileName) {
            setFileUrl(fileName);
        }
    }, [fileName]);

    // Return null if fileUrl is empty, else render the Viewer component
    return (
        <div>
            {fileUrl && (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div
                        style={{
                            maxHeight: '85vh',
                            minWidth: '600px',
                            width: '100%',
                            overflow: 'hidden',
                            border: '1px solid rgba(0, 0, 0, 0.3)',
                        }}
                    >
                        <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
                            <Viewer
                                fileUrl={fileUrl}
                                plugins={[pageNavigationPluginInstance]}
                                defaultScale={1}
                            />
                        </Worker>
                    </div>
                </div>
            )}
            <div
                style={{
                    alignItems: 'center',
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                <div style={{ padding: '0 2px' }}>
                    <GoToPreviousPage>
                        {(props: RenderGoToPageProps) => (
                            <button
                                style={{
                                    backgroundColor: props.isDisabled ? '#96ccff' : '#357edd',
                                    border: 'none',
                                    borderRadius: '4px',
                                    color: '#ffffff',
                                    cursor: props.isDisabled ? 'not-allowed' : 'pointer',
                                    padding: '8px',
                                }}
                                disabled={props.isDisabled}
                                onClick={props.onClick}
                            >
                                Previous page
                            </button>
                        )}
                    </GoToPreviousPage>
                </div>
                <div style={{ padding: '0 2px' }}>
                    <button
                        style={{
                            backgroundColor: '#357edd',
                            border: 'none',
                            borderRadius: '4px',
                            color: '#ffffff',
                            cursor: 'pointer',
                            padding: '8px',
                        }}
                        onClick={() => {
                            jumpToPage(5);
                        }}
                    >
                        Jump to page 5
                    </button>
                </div>

                <div style={{ padding: '0 2px' }}>
                    <GoToNextPage>
                        {(props: RenderGoToPageProps) => (
                            <button
                                style={{
                                    backgroundColor: props.isDisabled ? '#96ccff' : '#357edd',
                                    border: 'none',
                                    borderRadius: '4px',
                                    color: '#ffffff',
                                    cursor: props.isDisabled ? 'not-allowed' : 'pointer',
                                    padding: '8px',
                                }}
                                disabled={props.isDisabled}
                                onClick={props.onClick}
                            >
                                Next page
                            </button>
                        )}
                    </GoToNextPage>
                </div>
            </div>
        </div>
    );
};

export default App;
