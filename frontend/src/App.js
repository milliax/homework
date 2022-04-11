import React from "react";
import { Route, Routes } from "react-router-dom";

import Main from "./page/main"
import Docs from "./page/docs"


export function App() {
    return (
        <React.Fragment>
            <div className="bg-red-100 text-center h-16 font-bold text-2xl p-3">
                Top500.org 數據分析器
            </div>

            <div className="px-20">
                <div className="bg-gray-200 px-10 py-5">


                    <Routes>
                        <Route exact path="/" element={<Main />}></Route>
                        <Route path="docs" element={<Docs />}></Route>
                    </Routes>
                </div>
            </div>

            <div className="bg-gray-300 py-5 px-10">
                Footer
            </div>
        </React.Fragment>
    );
}