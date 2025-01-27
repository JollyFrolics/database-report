# Lab Report 4

# Transcation

A transcation is a function that follow the ACID in whole. A transcation is atomic. So it either happens or doesn't happen at all.

So we do make this transcation
```sql
CREATE DEFINER=`specialist`@`localhost` PROCEDURE `transcation_error_case`()
BEGIN
 START TRANSACTION;
  UPDATE account SET balance = balance - 50 WHERE name = 'Sanjog';
  UPDATE account SET balance = balance + 50 where name = 'None';
 COMMIT;
END$$
```
BEFORE
![image](https://github.com/user-attachments/assets/839718fa-0264-48f8-b54e-78db2c098ae2)

AFTER

![image](https://github.com/user-attachments/assets/fd09ff31-4560-4974-b958-8e68a2a33901)

We can see that our problem hasn't been solved.

For this we need to add a rollback system.

```sql
CREATE DEFINER=`root`@`localhost` PROCEDURE `transaction_with_error_handling`()
BEGIN
    DECLARE EXIT HANDLER FOR SQLEXCEPTION
    BEGIN
        -- Rollback the transaction on error
        ROLLBACK;
        SELECT 'Transaction failed, rollback executed' AS message;
    END;

    -- Start transaction
    START TRANSACTION;

    -- Deduct 50 from 'Prayash 1'
    UPDATE accounts SET balance = balance - 50 WHERE name = 'Sanjog 2';

    -- Error simulation: Attempt to add to a non-existing user
    UPDATE accounts SET ance = balance + 50 WHERE name = 'Prayash 2';

    -- Commit transaction if no errors
    COMMIT;

    SELECT 'Transaction successful, changes committed' AS message;
END
```

When we run it we get
![image](https://github.com/user-attachments/assets/2d524b02-b513-4b90-8240-9bea574128b3)

the value in the select table doesn't change

![image](https://github.com/user-attachments/assets/fd09ff31-4560-4974-b958-8e68a2a33901)
