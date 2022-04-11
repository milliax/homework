import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import Circle from "../components/circle"

export default function Main() {
    const [year, setYear] = useState(2021)
    const [month, setMonth] = useState(6)
    const [options, setOptions] = useState({
        country: false,
        count: false,
        manufacturer: false,
    })

    const [loading, setLoading] = useState(false)
    const [first, setFirst] = useState(true)

    const sendForm = async () => {
        setLoading(true)
        setFirst(false)
        console.log("Submit!!!")

        let methods = []
        for (let e in options) {
            if (options[e] === 1) {
                console.log(e)
                methods.push(e)
            }
        }
        console.log(methods)
        time = new Date(year, month)
        time = time.getTime()
        console.log(time)
        
        const body = {
            "time": time,
            "methods": methods
        }

        console.log(typeof (time))
        const res = await fetch(`https://flask.osaka.milliax.me/callback`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        console.log(res)
        const response = await res.json()

        console.log(response)
        setLoading(false)
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
                            <input type="checkbox" value="國家" checked={options.country} onChange={() => { setOptions({ ...options, country: options.country ^ 1 }) }} /> 國家(不含地區)
                        </div>
                        <div>
                            <input type="checkbox" value="算力/國家" checked={options.count} onChange={() => { setOptions({ ...options, count: options.count ^ 1 }) }} /> 算力/國家
                        </div>
                        <div>
                            <input type="checkbox" value="製造商" checked={options.manufacturer} onChange={() => { setOptions({ ...options, manufacturer: options.manufacturer ^ 1 }) }} /> 製造商
                        </div>
                    </div>

                    <button className="flex bg-blue-300 cursor-pointer hover:bg-blue-700 hover:text-white px-3 rounded-lg disabled:bg-red-600 disabled:text-black disabled:cursor-not-allowed p-1 disabled:hover:bg-red-700"
                        onSubmit={() => { sendForm() }} disabled={loading}>
                        {loading ? <><Circle />資料抓取中</> : <>開爬</>}

                    </button>

                </form>
            </div>

            <div className="" hidden={first}>
                Results:
            </div>

            <div>
                不知從何而起？這邊有<Link to="/docs" className="bg-red-300 cursor-pointer rounded-md px-1">教學</Link>供你參考
            </div>
        </div>
    )
}

