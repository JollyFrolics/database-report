# Lab Report 5

# Concurrency Control

You can start a concurrent action like this
```sql
BEGIN;
update account set balance = 10000000 WHERE id = 1;
```

and not commit it

then another user can try to update it

```sql
update account set balance = balance - 100 where id = 1;
```

But this won't get processed rather it is stuck as the previous user hasn't commited the change.

![image](https://github.com/user-attachments/assets/8871f3af-bffd-46d7-9c3f-72c778688075)

Only after the first user commits does the pause ends and the transcation processes.

Other ways of locking are to `SELECT FOR UPDATE` like this

```sql
select balance from account where id = 1 for update;
```

Or by locking table using `LOCK TABLES`

```sql
LOCK TABLES account READ;
```

and then unlock the table

```sql
Unlock TABLES;
```
