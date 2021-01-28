# 接口规范

此结构会直接影响[`/src/utils/request.ts`](./src/utils/request.ts)相关逻辑。

## 请求方法

建议`RESTful`。`GETful + POSTful`亦可。

## 关键请求头

请求头遵循规范为第一位，之后考虑自定义。

| 属性              | 值                                                             | 说明                                            |
| ---------------- | -------------------------------------------------------------  | ---------------------------------------------- |
| Accept           | application/json                                               | 非流文件响应数据只接受JSON                          |	
| Content-Type     | 1. application/json;charset=UTF-8                              | 除2和3之外的POST、PUT请求全部默认此值                |
|                  | 2. multipart/form-data; boundary=----WebKitFormBoundary...     | 文件上传                                         |
|                  | 3. application/x-www-form-urlencoded                           | 非特殊接口只能使用1。                              |

## 关键响应头

| 属性                              | 值                                                             | 说明                                            |
| -------------------------------- | -------------------------------------------------------------  | ---------------------------------------------- |
| content-disposition              | attachment;filename=xxx.xlsx                                   | filename用application/x-www-form-urlencoded格式 |	

其他按需按规范定义即可。

## Request Payload

仅适用`Content-Type`为`application/json;charset=UTF-8`的场景。

如果业务数据复杂，可考虑单独将`pageIndex`、`pageSize`挪至url。

```typescript
interface RequestPayload {
 [key]: [value];       // 业务数据。value必须JSON Safe。
 pageIndex?: number;   // 页码索引。
 pageSize?: number;    // 每页条数。
}
```

or

```typescript
interface RequestPayload {
 data: {
  [key]: [value];      // 业务数据。value必须JSON Safe。
 };
 pageIndex?: number;   // 页码索引。
 pageSize?: number;    // 每页条数。
}
```

## Response

仅适用`Content-Type`为`application/json;charset=UTF-8`的场景。

```typescript
interface ResponsePayload {
  code: number,         // 请求状态。复杂业务可使用String，但是全系统只能是Number、String之一。
  success?: boolean,    // 请求是否成功，此值按需添加，确定之后不再更改。
  message: string,      // 描述，失败返回必须是用户能看懂的。
  data: any,            // 必须返回，没有时赋值null。
  pageIndex?: number,   // 页码索引。
  pageSize?: number,    // 每页条数。
  totalCount?: number,  // 总条数。注：分页接口此参数必须。
}
```





