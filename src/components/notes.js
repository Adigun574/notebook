import React from 'react';
import '../css/notes.css';
import Sidebar from './sidebar';
import Notecontent from './notecontent';
import Header from './header';
import { GlobalProvider } from '../context/GlobalState';



function Notes() {
    return (
        <GlobalProvider>
            <div className="notes-body">
                <Header />
                <div className="row page-body">
                    <div className="col-sm-4">
                        <Sidebar />
                    </div>
                    <div className="col-sm-8">
                        <Notecontent />
                    </div>
                </div>
            </div>
        </GlobalProvider>
    )
}

export default Notes
