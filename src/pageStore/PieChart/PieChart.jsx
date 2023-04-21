import React, { useEffect, useState } from 'react'
import { Pie, measureTextWidth } from '@ant-design/plots';
import { useDispatch, useSelector } from 'react-redux';
import { actFetchAllCategory } from '../../redux/features/categorySlice/categorySlide';
import { actFetchBookByIdStore } from '../../redux/features/bookSlice/bookSlice';

const PieChart = () => {
    const dispatch = useDispatch()
    const {allCategory} = useSelector((state) => state.category)
    const {bookByStore} = useSelector((state) => state.book)
    const {user} = useSelector((state) => state.user)
    const idStore = user.storeId

    useEffect(() => {
        dispatch(actFetchAllCategory())
    },[])

    useEffect(() => {
        dispatch(actFetchBookByIdStore(idStore))
    },[idStore])

 



    function renderStatistic(containerWidth, text, style) {
        const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
        const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2
    
        let scale = 1;
    
        if (containerWidth < textWidth) {
          scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
        }
    
        const textStyleStr = `width:${containerWidth}px;`;
        return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
    }


    const data = [
        {
          type: 'Standard',
          value: 2,
        },
        {
          type: 'Superior',
          value: 10,
        },
        {
          type: 'Deluxe',
          value: 12,
        },
        {
          type: 'Suite',
          value: 12,
        },
        {
          type: 'Connecting',
          value: 13,
        },
    ];
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 1,
        innerRadius: 0.64,
        meta: {
          value: {
            formatter: (v) => `${v} ¥`,
          },
        },
        label: {
          type: 'inner',
          offset: '-50%',
          style: {
            textAlign: 'center',
          },
          autoRotate: false,
          content: '{value}',
        },
        statistic: {
          title: {
            offsetY: -4,
            customHtml: (container, view, datum) => {
              const { width, height } = container.getBoundingClientRect();
              const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
              const text = datum ? datum.type : 'Rooms';
              return renderStatistic(d, text, {
                fontSize: 28,
              });
            },
          },
          content: {
            offsetY: 4,
            style: {
              fontSize: '32px',
            },
            customHtml: (container, view, datum, data) => {
              const { width } = container.getBoundingClientRect();
              const text = datum ? ` ${datum.value}` : ` ${data.reduce((r, d) => r + d.value, 0)}`;
              return renderStatistic(width, text, {
                fontSize: 32,
              });
            },
          },
        },
     
        interactions: [
          {
            type: 'element-selected',
          },
          {
            type: 'element-active',
          },
          {
            type: 'pie-statistic-active',
          },
        ],
    };
  return (
    <div className='pie'>
        <Pie {...config} />
    </div>
  )
}

export default PieChart