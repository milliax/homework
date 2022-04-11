import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import Circle from "../components/circle"
import Swal from "sweetalert2"

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
    const [result, setResult] = useState([])
    const [timeError, setTimeError] = useState(false)

    const ironic = "https://www.youtube.com/watch?v=XqZsoesa55w&t=27s"

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

        /* Verify time */
        time_now = new Date()
        if (time_now < time) {
            setLoading(false)
            setTimeError(true)
            return await Swal.fire({
                icon: "info",
                title: "ほんとごめん",
                text: "本服務尚未進階為量子預測機"
            })
        }
        /* Verify Options */
        if (methods.length === 0) {
            setLoading(false)
            return await Swal.fire({
                icon: "error",
                title: "阿啊阿阿阿",
                text: "你沒有勾選項我是要給你什麼",
                footer: `<a href="${ironic}"> Why do I have this issue?</a>`
            })
        }


        const body = {
            "time": time,
            "methods": methods
        }

        console.log(typeof (time))
        const res = await fetch(`${process.env.REACT_APP_SERVER}/callback`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        console.log(res)
        const response = await res.json()

        setResult(response)
        console.log(response)
        setLoading(false)
    }

    useEffect(() => {
        const verify_time = () => {
            if (!timeError) return
            time = new Date(year, month)
            time_now = new Date()

            if (time_now < time) {
                setTimeError(false)
            }
        }

        verify_time()
        if (!(year <= 99999999 && year >= 0)){
            setYear(2021)
            Swal.fire({
                icon: "warning",
                title: "請不要玩我"
            })
        }
    }, [year, month])

    return (
        <div className="space-y-10">
            <div>
                <form onSubmit={event => {
                    event.preventDefault();
                    sendForm();
                }} className="space-y-3">
                    <div className="" >
                        選取資料範圍：
                        <span className="bg-red-600 rounded-md" hidden={!timeError}> 日期錯誤!!! </span>
                        年：
                        <input className="rounded-lg text-center" type="value" value={year} onChange={event => { setYear(parseInt(event.target.value)) }} />
                        月：<select className="rounded-lg" onChange={event => { setMonth(event.target.value) }}>
                            <option value="6">6</option>
                            <option value="11">11</option>
                        </select>
                    </div>

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

            {/* Running Pony */}
            <div className="w-full" hidden={!loading}>
                <div className="animate-running">
                    <img alt="Running pony" src="https://i.pinimg.com/originals/10/b7/d4/10b7d409056fb5ebadf13eb20ddf7d87.gif"
                        className="object-cover w-10" />
                </div>
            </div>

            <div className="" hidden={first}>
                Results:

                <div className="border-double border-2 border-blue-200 rounded-md">

                    {result.map((item, number) => (
                        <div className="px-5 py-1">
                            <div className="border-double border border-blue-500 rounded-md px-3 space-y-1 pb-2">
                                <div>
                                    模式: {item.mode}
                                </div>
                                <div className="flex justify-center">
                                    <img alt={`${item.mode}の圖`} src={`${process.env.REACT_APP_SERVER}/picture/${item.src}`}
                                        className="object-cover w-80 md:w-3/5"
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            <div>
                不知從何而起？這邊有<Link to="/docs" className="bg-red-300 cursor-pointer rounded-md px-1">教學</Link>供你參考
            </div>
        </div>
    )
}

