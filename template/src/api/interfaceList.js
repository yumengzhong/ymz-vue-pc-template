import axios from 'axios'

axios.defaults.baseURL = '/OrderCheckServer/'
axios.defaults.timeout = 1000 * 50

// 获取 楼层
export function getFloors () {
  const url = 'http://result.eolinker.com/YEf4Gi4be6ae12aabfed054b3c190c3f9720d6457e638b1?uri=OrderCheckServer/rest/orders/floors'
  return axios.get(url).then((res) => {
    return res.data
  })
}
