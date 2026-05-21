"use client"

import React from "react"

type OrderItem = {
  name: string
  price: number
}

type CompletedOrder = {
  id: number
  tableNumber: string
  items: OrderItem[]
  total: number
  time: string
}

export default function SweetShopPOS() {

  const menu = [
    { name: "タロイモ西米露", price: 680 },
    { name: "芋丸仙草ゼリー", price: 700 },
    { name: "楊枝甘露", price: 680 },
    { name: "芋丸豆花", price: 700 },
    { name: "蓮の実豆花", price: 730 },
    { name: "黒糖仙草ゼリー", price: 700 },
  ]

  const [currentOrder, setCurrentOrder] = React.useState<OrderItem[]>([])
  const [completedOrders, setCompletedOrders] = React.useState<CompletedOrder[]>([])
  const [tableNumber, setTableNumber] = React.useState("")

  const addItem = (name: string, price: number) => {
    setCurrentOrder([
      ...currentOrder,
      { name, price }
    ])
  }

  const total = currentOrder.reduce(
    (sum, item) => sum + item.price,
    0
  )

  const completeOrder = () => {

    if (currentOrder.length === 0) {
      alert("まだ注文がありません")
      return
    }

    const newOrder: CompletedOrder = {
      id: Date.now(),
      tableNumber: tableNumber || "未入力",
      items: currentOrder,
      total,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
      })
    }

    setCompletedOrders([
      newOrder,
      ...completedOrders
    ])

    setCurrentOrder([])
    setTableNumber("")
  }

  return (
    <div
      style={{
        padding: "30px",
        background: "#fff7f2",
        minHeight: "100vh",
        fontFamily: "sans-serif"
      }}
    >

      <h1 style={{ marginBottom: "20px" }}>
        🍨 甜品店POS系统
      </h1>

      {/* 桌号输入 */}

      <div
        style={{
          marginBottom: "20px"
        }}
      >
        <input
          type="text"
          placeholder="请输入桌号 / 座位号"
          value={tableNumber}
          onChange={(e) => setTableNumber(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px"
          }}
        />
      </div>

      {/* 菜单 */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px"
        }}
      >
        {menu.map((item) => (
          <div
            key={item.name}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
            }}
          >
            <h2>{item.name}</h2>

            <p
              style={{
                color: "#d1495b",
                fontSize: "20px"
              }}
            >
              ¥{item.price}
            </p>

            <button
              onClick={() => addItem(item.name, item.price)}
              style={{
                background: "#e07a5f",
                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "8px",
                cursor: "pointer"
              }}
            >
              点单
            </button>
          </div>
        ))}
      </div>

      {/* 当前订单 */}

      <div
        style={{
          marginTop: "40px",
          background: "white",
          padding: "20px",
          borderRadius: "12px"
        }}
      >

        <h2>🧾 当前订单</h2>

        {currentOrder.map((item, index) => (
  <div
    key={index}
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "10px",
      padding: "10px",
      background: "#f8f8f8",
      borderRadius: "8px"
    }}
  >

    <div>
      {item.name} - ¥{item.price}
    </div>

    <button
      onClick={() => {

        const updatedOrder = currentOrder.filter(
          (_, i) => i !== index
        )

        setCurrentOrder(updatedOrder)

      }}
      style={{
        background: "#e63946",
        color: "white",
        border: "none",
        padding: "6px 12px",
        borderRadius: "6px",
        cursor: "pointer"
      }}
    >
      删除
    </button>

  </div>
))}

        <h2
          style={{
            marginTop: "20px",
            color: "#d1495b"
          }}
        >
          合计：¥{total}
        </h2>

        <button
          onClick={completeOrder}
          style={{
            marginTop: "20px",
            background: "#2a9d8f",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px"
          }}
        >
          完成订单
        </button>

      </div>

      {/* 历史订单 */}

      <div
        style={{
          marginTop: "40px"
        }}
      >

        <h2>📒 历史订单</h2>

        {completedOrders.map((order) => (
          <div
            key={order.id}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              marginTop: "15px"
            }}
          >

            <h3>
              桌号：{order.tableNumber}
            </h3>

            <p>
              时间：{order.time}
            </p>

            {order.items.map((item, index) => (
              <div key={index}>
                {item.name} - ¥{item.price}
              </div>
            ))}

            <h3
              style={{
                marginTop: "10px",
                color: "#d1495b"
              }}
            >
              总计：¥{order.total}
            </h3>

          </div>
        ))}

      </div>

    </div>
  )
}