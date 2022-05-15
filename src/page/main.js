import { Link } from "react-router-dom"
import { useEffect, useState } from "react"

import Circle from "../components/circle"
import Swal from "sweetalert2"
import "../css/custom.css"
const KANNA_HASHIMOTO = [
    "https://i.pinimg.com/originals/f6/38/f8/f638f8a25b7c5239c23df2c16da631da.jpg",
    "https://i.pinimg.com/736x/f3/48/e6/f348e62e9e46d0c6e14a5a732dec41e8.jpg",
    "https://pbs.twimg.com/media/FMWiIIHagAUfQTq?format=jpg&name=large",
    "https://pbs.twimg.com/media/FH8idFAVQAQHCkC?format=jpg&name=large",
]

export default function Main() {
    const [year, setYear] = useState(2021)
    const [month, setMonth] = useState(6)
    const [options, setOptions] = useState({
        country: false,
        energy: false,
        manufacturer: false,
        countability: false,
        cores: false,
    })

    const [loading, setLoading] = useState(false)
    const [first, setFirst] = useState(true)
    const [result, setResult] = useState([])
    const [timeError, setTimeError] = useState(false)
    const [selectAll, setSelectAll] = useState(false)

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
        let time_start = new Date(1993,6)
        if(time < time_start){
            setLoading(false)
            setTimeError(true)
            return await Swal.fire({
                icon: `info`,
                title: `注意`,
                text: `超級電腦數據是從1993年6月開始紀錄的喔`
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

    const selectingAll = () => {
        names = ["country", "energy", "manufacturer", "countability", "cores"]
        setSelectAll(selectAll ^ 1)

        let new_list = options
        for (let name of names) {
            new_list[name] = selectAll ^ 1
            console.log(name)
        }
        setOptions(new_list)

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
        if (!(year <= 9999999 && year >= 0)) {
            setYear(2021)
            Swal.fire({
                icon: "warning",
                title: "請不要玩我"
            })
        }
    }, [year, month])

    const updateYear = (event)=>{
        try{
            if(event.target.value === ""){
                setYear("")
                return
            }
            let num = parseInt(event.target.value)
            setYear(num)
        }catch(err){
            alert("僅能輸入數字")
        }
    }

    const runningPony = {
        transform: "translateX(10%)",
    }

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
                        <input className="rounded-lg text-center" type="value" value={year} onChange={event => { updateYear(event) }} />
                        月：<select className="rounded-lg" onChange={event => { setMonth(event.target.value) }}>
                            <option value="6">6</option>
                            <option value="11">11</option>
                        </select>
                    </div>

                    <div className="space-y-1">
                        <div>
                            <input type="checkbox" value="全選" checked={selectAll} onChange={() => { selectingAll() }} /> 全選
                        </div>
                        <div>
                            <input type="checkbox" value="國家" checked={options.country} onChange={() => { setOptions({ ...options, country: options.country ^ 1 }) }} /> 國家(不含地區)
                        </div>
                        <div>
                            <input type="checkbox" value="算力/國家" checked={options.countability} onChange={() => { setOptions({ ...options, countability: options.countability ^ 1 }) }} /> 算力/國家
                        </div>
                        <div>
                            <input type="checkbox" value="製造商" checked={options.manufacturer} onChange={() => { setOptions({ ...options, manufacturer: options.manufacturer ^ 1 }) }} /> 製造商
                        </div>
                        <div>
                            <input type="checkbox" value="耗能/國家" checked={options.energy} onChange={() => { setOptions({ ...options, energy: options.energy ^ 1 }) }} /> 耗能/國家
                        </div>
                        <div>
                            <input type="checkbox" value="核心數/國家" checked={options.cores} onChange={() => { setOptions({ ...options, cores: options.cores ^ 1 }) }} /> 核心數/國家
                        </div>
                    </div>

                    <div className="flex flex-row justify-start">
                        <button className="flex bg-blue-300 cursor-pointer hover:bg-blue-700 hover:text-white px-3 rounded-lg disabled:bg-red-600 disabled:text-black disabled:cursor-not-allowed p-1 disabled:hover:bg-red-700"
                            onSubmit={() => { sendForm() }} disabled={loading}>
                            {loading ? <div className="flex flex-row text-center items-center"><Circle />資料抓取中</div> : <>開爬</>}
                        </button>

                        {/* Running Pony */}
                        <div className="grow" hidden={!loading}>
                            <div className="runningPony">
                                <img alt="Running pony" src="https://i.pinimg.com/originals/10/b7/d4/10b7d409056fb5ebadf13eb20ddf7d87.gif"
                                    className="object-cover w-10" />
                            </div>
                        </div>
                    </div>

                </form>
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
                                    <img alt={`${item.mode}の圖`} src={item.src === null ? KANNA_HASHIMOTO[Math.floor(Math.random() * KANNA_HASHIMOTO.length)] : `${process.env.REACT_APP_SERVER}/picture/${item.src}`}
                                        className="object-cover w-80 md:w-3/5"
                                    />
                                </div>
                                <div hidden={item.note ? false : true}>備註：{item.note}</div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            <div>
                不知從何而起？這邊有<Link to="/docs" className="bg-red-300 cursor-pointer rounded-md px-1 hover:bg-red-400">教學</Link>供你參考
            </div>
        </div>
    )
}

