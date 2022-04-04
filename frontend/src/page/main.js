import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import Circle from "../components/circle"

export default function Main() {
    const [year, setYear] = useState(2021)
    const [month, setMonth] = useState(6)
    const [option1, setOption1] = useState(false)
    const [option2, setOption2] = useState(false)
    const [option3, setOption3] = useState(false)

    const [loading, setLoading] = useState(false)

    const sendForm = async () => {
        setLoading(true)
        console.log("Submit!!!")
    }

    return (
        <div className="space-y-10">
            <div>
                <form onSubmit={event => {
                    event.preventDefault();
                    sendForm();
                }} className="space-y-3">
                    選取資料範圍：
                    年：
                    <input className="rounded-lg text-center" type="value" value={year} onChange={event => { setYear(parseInt(event.target.value | 0)) }} />
                    月：<select className="rounded-lg" onChange={event => { setMonth(event.target.value) }}>
                        <option value="6">6</option>
                        <option value="11">11</option>
                    </select>

                    <div className="space-y-1">
                        <div>
                            <input type="checkbox" value="第一款" checked={option1} onChange={() => { setOption1(option1 ^ 1) }} /> 第一款
                        </div>
                        <div>
                            <input type="checkbox" value="第二款" checked={option2} onChange={() => { setOption2(option2 ^ 1) }} /> 第二款
                        </div>
                        <div>
                            <input type="checkbox" value="第三款" checked={option3} onChange={() => { setOption3(option3 ^ 1) }} /> 第二款
                        </div>
                    </div>

                    <button className="flex bg-blue-300 cursor-pointer hover:bg-blue-700 hover:text-white px-3 rounded-lg disabled:bg-red-600 disabled:text-black disabled:cursor-not-allowed p-1 disabled:hover:bg-red-700" 
                        onClick={() => { sendForm() }} disabled={loading}>
                        {loading ? <><Circle />資料抓取中</>: <>開始</>}
                        
                    </button>

                </form>
            </div>

            <div>
                Results:
            </div>

            <div>
                不知從何而起？這邊有<Link to="/docs" className="bg-red-300 cursor-pointer rounded-md px-1">教學</Link>供你參考
            </div>
        </div>
    )
}

