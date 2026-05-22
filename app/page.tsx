"use client"

import React from "react"

type OrderItem = {
  name: string
  price: number
  isDone: boolean
}

type CompletedOrder = {
  id: number
  tableNumber: string
  items: OrderItem[]
  total: number
  time: string
  isPaid: boolean
}

export default function SweetShopPOS() {

  // 食品菜单

  const foodMenu = [
    { name: "タロイモ西米露", price: 680 },
    { name: "芋丸仙草ゼリー", price: 700 },
    { name: "楊枝甘露", price: 680 },
    { name: "芋丸豆花", price: 700 },
    { name: "蓮の実豆花", price: 730 },
    { name: "黒糖仙草ゼリー", price: 700 },
  ]

  // 饮品菜单

  const drinkMenu = [
    {
      name: "ブレンドコーヒー",
      price: 450,
      options: ["HOT", "ICE"]
    },

    {
      name: "カフェラテ",
      price: 550,
      options: ["HOT", "ICE"]
    },

    {
      name: "ココア",
      price: 600,
      options: ["HOT", "ICE"]
    },

    {
      name: "黒胡麻ラテ",
      price: 650,
      options: ["HOT", "ICE"]
    },

    {
      name: "紅茶",
      price: 450,
      options: ["HOT", "ICE"]
    },

    {
      name: "いちご紅茶",
      price: 550,
      options: ["HOT", "ICE"]
    },

    {
      name: "白桃烏龍茶",
      price: 500,
      options: ["HOT", "ICE"]
    },

    {
      name: "金木犀烏龍茶",
      price: 500,
      options: ["HOT", "ICE"]
    },

    {
      name: "グリーンティ",
      price: 550,
      options: ["HOT", "ICE"]
    },

    {
      name: "フルーツティー",
      price: 550,
      options: ["ICE"]
    },

    {
      name: "ミルクティー",
      price: 650,
      options: ["HOT", "ICE"]
    },

    {
      name: "レモンティー",
      price: 650,
      options: ["ICE"]
    },

    {
      name: "ゆずソーダ",
      price: 600,
      options: ["ICE"]
    },

    {
      name: "しそソーダ",
      price: 650,
      options: ["ICE"]
    },

    {
      name: "抹茶ソーダ",
      price: 650,
      options: ["ICE"]
    },
  ]

  // state

  const [currentOrder, setCurrentOrder] =
    React.useState<OrderItem[]>([])

  const [completedOrders, setCompletedOrders] =
    React.useState<CompletedOrder[]>([])

  const [tableNumber, setTableNumber] =
    React.useState("")

  // 按钮闪烁效果

  const [activeButton, setActiveButton] =
    React.useState("")

  const flashButton = (id: string) => {

    setActiveButton(id)

    setTimeout(() => {

      setActiveButton("")

    }, 250)

  }

  // 添加商品

  const addItem = (
    name: string,
    price: number,
    option?: string
  ) => {

    const finalName = option
      ? `${name} (${option})`
      : name

    setCurrentOrder((prev) => [
      ...prev,
      {
        name: finalName,
        price,
        isDone: false
      }
    ])
  }

  // 当前总价

  const total = currentOrder.reduce(
    (sum, item) => sum + item.price,
    0
  )

  // 完成订单

  const completeOrder = () => {

    if (currentOrder.length === 0) {
      alert("まだ注文がありません")
      return
    }

    const newOrder: CompletedOrder = {
      id: Date.now(),

      tableNumber:
        tableNumber || "未入力",

      items: currentOrder,

      total,

      time: new Date().toLocaleTimeString(
        [],
        {
          hour: "2-digit",
          minute: "2-digit"
        }
      ),

      isPaid: false
    }

    setCompletedOrders((prev) => [
      newOrder,
      ...prev
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

      <h1
        style={{
          marginBottom: "20px"
        }}
      >
        🍨 甜品店 POS 系统
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
          onChange={(e) =>
            setTableNumber(e.target.value)
          }
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "16px"
          }}
        />

      </div>

      {/* 食品菜单 */}

      <h2 style={{ marginTop: "20px" }}>
        🍮 食品
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px"
        }}
      >

        {foodMenu.map((item) => (

          <div
            key={item.name}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.1)"
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
            </p >

            <button
              onClick={() => {

                addItem(
                  item.name,
                  item.price
                )

                flashButton(item.name)

              }}
              style={{
                background:
                  activeButton === item.name
                    ? "#2a9d8f"
                    : "#e07a5f",

                color: "white",
                border: "none",
                padding: "10px 15px",
                borderRadius: "8px",
                cursor: "pointer",
                transition: "0.2s"
              }}
            >
              点单
            </button>

          </div>

        ))}

      </div>

      {/* 饮品菜单 */}

      <h2 style={{ marginTop: "40px" }}>
        🥤 饮品
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "20px"
        }}
      >

        {drinkMenu.map((item) => (

          <div
            key={item.name}
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "12px",
              boxShadow:
                "0 2px 8px rgba(0,0,0,0.1)"
            }}
          >

            <h2>{item.name}</h2>

            <p
              style={{
                color: "#457b9d",
                fontSize: "20px"
              }}
            >
              ¥{item.price}
            </p >

            <div
              style={{
                display: "flex",
                gap: "10px",
                flexWrap: "wrap",
                marginTop: "10px"
              }}
            >

              {item.options.map((option) => (

                <button
                  key={option}
                  onClick={() => {

                    addItem(
                      item.name,
                      item.price,
                      option
                    )

                    flashButton(
                      item.name + option
                    )

                  }}
                  style={{
                    background:
                      activeButton ===
                        item.name + option
                        ? "#2a9d8f"
                        : "#457b9d",

                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "0.2s"
                  }}
                >
                  {option}
                </button>

              ))}

            </div>

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

        <h2>
          🧾 当前订单
        </h2>

        {currentOrder.map((item, index) => (

          <div
            key={index}
            style={{
              display: "flex",
              justifyContent:
                "space-between",
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

                setCurrentOrder((prev) =>
                  prev.filter(
                    (_, i) =>
                      i !== index
                  )
                )

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

        <h2>
          📒 历史订单
        </h2>

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
            </p >

            {/* 结账按钮 */}

            <button
              onClick={() => {

                const updatedOrders =
                  completedOrders.map((o) => {

                    if (o.id === order.id) {

                      return {
                        ...o,
                        isPaid:
                          !o.isPaid
                      }

                    }

                    return o

                  })

                setCompletedOrders(
                  updatedOrders
                )

              }}
              style={{
                background:
                  order.isPaid
                    ? "#2a9d8f"
                    : "#e63946",

                color: "white",

                border: "none",

                padding: "8px 12px",

                borderRadius: "8px",

                cursor: "pointer",

                marginBottom: "15px"
              }}
            >

              {order.isPaid
                ? "✅ 已结账"
                : "❌ 未结账"}

            </button>

            {/* 菜品列表 */}

            {order.items.map((item, itemIndex) => (

              <div
                key={itemIndex}
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  alignItems: "center",
                  marginBottom: "10px",
                  padding: "10px",
                  background:
                    item.isDone
                      ? "#d8f3dc"
                      : "#f8f8f8",

                  borderRadius: "8px"
                }}
              >

                <div>

                  {item.isDone
                    ? "🟢 "
                    : "🟡 "}

                  {item.name}
                  {" "}
                  - ¥{item.price}

                </div>

                {/* 单个菜品完成按钮 */}

                <button
                  onClick={() => {

                    const updatedOrders =
                      completedOrders.map((o) => {

                        if (o.id === order.id) {

                          const updatedItems =
                            o.items.map(
                              (
                                food,
                                index
                              ) => {

                                if (
                                  index ===
                                  itemIndex
                                ) {

                                  return {
                                    ...food,
                                    isDone:
                                      !food.isDone
                                  }

                                }

                                return food

                              }
                            )

                          return {
                            ...o,
                            items:
                              updatedItems
                          }

                        }

                        return o

                      })

                    setCompletedOrders(
                      updatedOrders
                    )

                  }}
                  style={{
                    background:
                      item.isDone
                        ? "#2a9d8f"
                        : "#f4a261",

                    color: "white",

                    border: "none",

                    padding: "6px 12px",

                    borderRadius: "6px",

                    cursor: "pointer"
                  }}
                >

                  {item.isDone
                    ? "已完成"
                    : "制作中"}

                </button>

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