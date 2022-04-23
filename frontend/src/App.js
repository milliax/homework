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
            <div className="bg-gray-300 py-5 px-10 flex justify-center">
                <div className="w-1/2">
                    這裡是腳腳
                    <div>
                        編篡者：Milliax, yz781617, pting<br />
                        <div className="flex flex-row">授權：<img className="h-5" src="https://i.creativecommons.org/l/by-nc-sa/3.0/tw/88x31.png" /></div>
                    </div>
                </div>
                <div className="w-1/2">
                    This is Footer
                    <div>
                        Coder: Milliax, yz781617, <a href="https://www.instagram.com/p.t.ing.0624/">pting</a>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}