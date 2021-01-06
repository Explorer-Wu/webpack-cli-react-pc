import React, {useState, useEffect} from 'react'
import _ from 'lodash'
import { $ApiChart } from '@@api'
import './index.scss'

const updateInterval = 3600 * 1000
const baseVsList = [
    {title: '正常', value: 0, percent: 0},
    {title: '异常', value: 0, percent: 0},
    {title: '未配置', value: 0, percent: 0},
    {title: '告警', value: 0, percent: 0},
]
const baseRsList = [
    {title: '4层', value: 0, percent: 0},
    {title: '7层', value: 0, percent: 0},
]

export default function () {
    const [vsList, setVsList] = useState(baseVsList)
    const [rsList, setRsList] = useState(baseRsList)

    const update = () => {
        const vsItems = ['up', 'down', 'noconfig', 'warning']
        const rsItems = ['up', 'down', 'unknow', 'warning']
        $ApiChart.getVsStatus().then(data => {
            const newVsList = _.cloneDeep(baseVsList)
            const newRsList = _.cloneDeep(baseRsList)
            let vsTotal = 0
            let slbRsTotal = 0
            let nginxRsTotal = 0

            data.forEach(item => {
                vsTotal += _(vsItems).map(key => item.vs_statistic[key]).sum()
                slbRsTotal += _(rsItems).map(key => item.slb_rs_statistic[key]).sum()
                nginxRsTotal += _(rsItems).map(key => item.nginx_rs_statistic[key]).sum()

                vsItems.forEach((key, idx) => {
                    newVsList[idx].value += item.vs_statistic[key]
                })

                newRsList[0].value += item.slb_rs_statistic.up
                newRsList[1].value += item.nginx_rs_statistic.up
            })
            newVsList.forEach(item => {
                item.percent = _.round(item.value / vsTotal * 100, 0)
            })
            newRsList[0].percent = _.round(newRsList[0].value / slbRsTotal * 100, 0)
            newRsList[1].percent = _.round(newRsList[1].value / nginxRsTotal * 100, 0)

            setVsList(newVsList)
            setRsList(newRsList)
        })
    }

    useEffect(() => {
        update()
        const interval = setInterval(update, updateInterval)
        return () => {clearInterval(interval)}
    }, [])


    const colBar = (item) => (
        <div key={item.title}>
            <div className={"status-bar-bg"}>
                <div className="status-bar-column" style={{width: item.percent + '%'}} >
                    <div className={"pos-angle"}>{item.value}</div>
                </div>
            </div>
        </div>
    )

    return (
        <div className="vs-box vs-rs-status">
            <h3 className={'vs-box-title'}>VS/RS 状态</h3>

            <div className={"vs-box-content"}>
                <div className={'status-title'}>
                    <h3>VS</h3>
                    {vsList.map(item => (<p key={item.title}>{item.title}</p>))}
                    <h3 className={"rs-title"}>RS</h3>
                    {rsList.map(item => (<p key={item.title}>{item.title}</p>))}
                </div>
                <div className={'status-bar'}>
                    <h3>VS</h3>
                    {vsList.map(item => colBar(item))}
                    <h3 className={"rs-title"}>RS</h3>
                    {rsList.map(item => colBar(item))}
                </div>
                <div className={'status-value'}>
                    <h3>VS</h3>
                    {vsList.map(item => (<p key={item.title}>{round(item.percent, 1)} %</p>))}
                    <h3 className={"rs-title"}>RS</h3>
                    {rsList.map(item => (<p key={item.title}>{round(item.percent, 1)} %</p>))}
                </div>
            </div>
        </div>
    )
}
