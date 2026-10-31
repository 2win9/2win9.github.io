---
title: EXISTS는 무엇을 확인할까
description: SELECT NULL인데도 참이 되는 이유를 작은 SQL로 확인하기.
pubDate: 2026-10-31
category: notes
tags:
  - SQL
  - 데이터베이스
published: true
example: true
---

> 본문과 코드 블록의 모양을 확인하기 위한 예시 글입니다.

## 확인하는 것은 행의 존재

`EXISTS`는 서브쿼리가 행을 반환하는지 확인합니다. 서브쿼리가 선택한 값이 `NULL`이어도, 반환된 행이 있다면 참입니다.

아래 Oracle 예제에서는 `DUAL`에서 한 행이 반환되므로 결과에 `행이 있음`이 표시됩니다.

```sql
SELECT '행이 있음' AS result
FROM dual
WHERE EXISTS (
    SELECT NULL
    FROM dual
);
```

## 행이 없다면

다음 서브쿼리는 `WHERE 1 = 0` 때문에 행을 반환하지 않습니다. 따라서 바깥쪽 쿼리도 결과 행을 반환하지 않습니다.

```sql
SELECT '행이 있음' AS result
FROM dual
WHERE EXISTS (
    SELECT NULL
    FROM dual
    WHERE 1 = 0
);
```

`EXISTS`를 읽을 때는 **서브쿼리에서 결과 행이 하나라도 나오는가**를 먼저 확인합니다.
