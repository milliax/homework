import { Link } from "react-router-dom"

export default function Docs() {
    return (
        <div className="space-y-5">
            <div>
                <Link to="/" className="bg-blue-300 hover:bg-blue-400 rounded-md px-2 py-1">回功能頁面</Link>
            </div>
            <div className="bg-gray-300 rounded-md px-3 py-2">
                對不起啦
                我還沒有時間寫
            </div>

        </div>
    )
}