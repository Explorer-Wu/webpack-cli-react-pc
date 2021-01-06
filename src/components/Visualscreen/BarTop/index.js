import React, {useState, useEffect} from 'react';
import { EnvironmentOutlined, AlertOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { $Moment } from '@@api';
import './index.scss';

const { Option } = Select;

export default function () {
    const [curTime, setTime] = useState($Moment().format("HH:mm:ss"))
    const [curWeek, setWeek] = useState($Moment().format("dddd YYYY.MM.DD"))
    const [curCity, setCity] = useState('杭州市')
    const [curNums, setNums] = useState(1);

    useEffect(() => {
        const id = setInterval(() => {
            setTime($Moment().format("HH:mm:ss"))
            if (curWeek !== $Moment().format("dddd YYYY.MM.DD")) {
                setWeek($Moment().format("dddd YYYY.MM.DD"))
            }
        }, 1000)
        return () => {clearInterval(id)}
    }, []);

    function handleChange(value) {
        console.log(`selected ${value}`);
    }

    return (
        <div className="vs-bar-top">
            <div className="bar-left">
                <strong className="time">{curTime}</strong> 
                <span className="date-week">{curWeek}</span>
                <div className="location">
                    <EnvironmentOutlined className="loc-icon"/>
                    <span>{curCity}</span>
                </div>
            </div>
            <div className="bar-center">
                {/* <div className="box-title"> */}
                <div className="vs-logo"/>
                <h1>大屏数据可视化系统</h1>
            </div>
            <div className="bar-right">
                <div className="message">
                    <AlertOutlined className="warn-icon"/>
                    <span>今日告警推送</span>
                    <strong>{curNums}</strong>
                    <span>条</span>
                </div>
                <Select size="small" bordered={false} className="region" defaultValue="serv-room-hz" onChange={handleChange}>
                    <Option value="serv-room-bj">北京机房</Option>
                    <Option value="serv-room-sh">上海机房</Option>
                    <Option value="serv-room-nj">南京京机房</Option>
                    <Option value="serv-room-hz">杭州机房</Option>
                </Select>
            </div>
        </div>
    )
}