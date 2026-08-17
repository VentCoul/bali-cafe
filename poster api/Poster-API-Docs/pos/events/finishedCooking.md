## finishedCooking: Блюдо было приготовлено

```javascript
    Poster.on('finishedCooking', (order) => {
        console.log(order);
    });
```

> Пример ответа:

```json
{
    "order": {
        "id":1700236752328, 
        "dateStart":1700236752328,
        "dateClose":0,
        "datePrint":0,
        "status":1,
        "userId":4,
        "tableId":1,
        "orderName":28,
        "guestsCount":1,
        "serviceMode":1,
        "orderSource":0,
        "processingStatus":10,
        "products":{
            "0":{
                "id":5,
                "count":3,
                "printedNum":3,
                "productSum":4,
                "price":4,
                "modificationHash":"",
                "taxId":"0",
                "taxValue":"0",
                "taxType":"0",
                "taxFiscal":0,
                "productComment":"",
                "guestNumber":1,
                "isDish":null,
                "cookedNum":7
            }
        },
        "deliveryInfo":{
            "country":"",
            "city":"",
            "courierId":0,
            "address1":"",
            "address2":"",
            "lat":null,
            "lng":null,
            "billAmount":0,
            "paymentMethodId":0,
            "comment":"",
            "deliveryTime":0,
            "deliveryZoneId":0,
            "deliveryPrice":0,
            "uuid":"",
            "zipCode":""
        },
        "clientLoyaltyType":0,
        "subtotal":12,
        "total":12,
        "discount":0,
        "clientId":0,
        "payType":"0",
        "payedSum":0,
        "payedCard":0,
        "payedCash":0,
        "payedCert":0,
        "payedEwallet":0,
        "payedThirdParty":0,
        "payedBonus":0,
        "approvedBonus":0,
        "platformDiscount":0,
        "loyaltyAppId":0,
        "parentId":0,
        "paymentMethodId":0,
        "tipIncluded":0,
        "tipSum":0,
        "tipsCash":0,
        "tipsCard":0,
        "roundSum":0,
        "printFiscal":0,
        "comment":"",
        "fromHistory":false
    },
    "product":{
        "id":5,
        "delete":0,
        "hidden":0,
        "fiscal":0,
        "fiscalProgram":0,
        "nodiscount":0,
        "parent":2,
        "sortOrder":999,
        "weightFlag":0,
        "workshop":2,
        "price":4,
        "cookingTime":0,
        "barcode":"",
        "picture":"",
        "color":"white",
        "taxType":0,
        "taxValue":0,
        "taxId":0,
        "taxName":"",
        "fiscalCode":"",
        "masterId":0,
        "modifications":{},
        "orderSources":{}
    },
    "user":{
        "id":4,
        "posPass":"0000",
        "name":"Даниель",
        "deleted":0,
        "admin":true,
        "inn":""
    },
    "productCount":1,
    "startCooking":1702026051903,
    "finishedCooking":1702026052744,
    "success":true,
    "saveCallback":true
}

```

Событие срабатывает после нажатия кнопки **Готово** в приложении Kitchen Kit.

### Ответ

В качестве аргумента в обработчик приходит объект `data` с такими свойствами

| Свойство | Значение                                                |
|----------|---------------------------------------------------------|
| order    | Объект заказа типа [Order](/docs/v3/pos/types/order)    |
| product  | Объект с отправленным товаром                           |
| user     | Объект активного пользователя, который отправил бегунок |

Свойство `product` содержит следующие свойства

| Свойство     | Значение                                                     |
|--------------|--------------------------------------------------------------|
| id           | ID товара                                                    |
| modification | ID модификации, если у товара нет модификации то не приходит |
| count        | Новое кол-во товара, если значение равно 0, то товар удалили |

