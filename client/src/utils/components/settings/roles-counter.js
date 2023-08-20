import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'
import { Button, Space, Spin, Divider, notification} from 'antd';

//
const RolesCounter = () => {
  const [roles, setRoles] = useState({})
  const [loaded, setLoader] = useState(true)

  const isMounted = React.useRef(true);

  const {token, gameId, creator} = useParams()

  const [api, contextHolder] = notification.useNotification();
  const openNotification = (content, type) => {
    api[type]({
      message: `پیغام سیستم`,
      description: content,
      placement: 'topRight',
    });
  };


  const roler = (data) => {
    let dataObj = {}
    for (let i of data){
      dataObj[i[0]] = i[1]
    }
    return dataObj;
  }
  useEffect(() => {
    if(isMounted.current){
      fetch(`/api/${token}/${gameId}/${creator}/roles`)
        .then((response) => response.json())
        .then((item) => setRoles(roler(item.result)))
        .then(() => setLoader(false));
        isMounted.current = false
    }
  }, [roles, loaded]);

  const onClicked = (x, prompt) => {
    const data = {}
    if (x[1] <= 1 && !prompt) return
    prompt ? data[x[0]] = x[1] + 1 : data[x[0]] = x[1] - 1;
    setRoles(prev => ({...prev, ...data}))
  }

  const saveRoles = () => {
    setLoader(true)
    let rolesString = []
    Object.entries(roles).map((x) => {
      rolesString.push(x.join('.'))
    })
    rolesString = rolesString.join(',')
    console.log(rolesString);
    fetch(`/api/${token}/${gameId}/${creator}/roles/${rolesString}`)
      .then((response) => response.json())
      .then((res) => openNotification(res.result, 'success'))
      .then(() => setLoader(false))
  }

  return (
    <div style={{textAlign: 'center', alignItems: 'center', direction: 'rtl'}}>
      {contextHolder}
      <Spin spinning={loaded}>
        <Divider plain>تغییر تعداد نقش ها</Divider>
        {Object.entries(roles).map((x) => {
            return (
              <>
              <Divider plain>
              <div style={{display: 'inline-block'}}>{x[0]}</div>
              </Divider>
              <Space.Compact style={{padding: 10}}>
              <Button type="primary" onClick={() => onClicked(x, true)}>+</Button>
              <div style={{textAlign: 'center', padding: 5}}>{x[1]}</div>
              <Button type="primary" onClick={() => onClicked(x, false)} danger>-</Button>
              </Space.Compact>
              </>
            )
          })}
          <Divider />
        <Button onClick={saveRoles} type="primary">ذخیره</Button>
      </Spin>
    </div>
  )
}
export default RolesCounter;
