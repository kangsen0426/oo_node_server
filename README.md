"# oo_node_server" 

### 用户

##### 添加用户

*地址：/singup/add*

|        | 参数 | 类型   | 必需 |
| ------ | ---- | ------ | ---- |
| 用户名 | name | String | 0    |
| 邮箱   | mail | String | 0    |
| 密码   | pwd  | String | 0    |

##### 验证用户名或邮箱是否已注册

*地址：/singup/judge*

|        | 参数  | 类型   | 必需 |
| ------ | ----- | ------ | ---- |
| 用户名 | name  | String | 1    |
| 邮箱   | email | String | 1    |

