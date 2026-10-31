---
title: GROUP BY에 컬럼 두 개를 넣고 헷갈렸던 이유
description: 상품코드별 합계와 판매월별 합계를 각각 구하며 이해한 GROUP BY, GROUPING SETS, ROLLUP, CUBE. SQLD 공부 내용을 Oracle 기준으로 정리했다.
pubDate: 2026-11-01
category: notes
tags:
  - SQL
  - SQLD
  - Oracle
published: true
example: false
---

SQLD를 준비하면서 상품코드별 판매수량과 판매월별 판매수량을 각각 구하는 문제에서 헷갈렸다.

두 가지 기준으로 집계해야 하니 `GROUP BY`에 두 컬럼을 모두 적으면 되지 않을까 싶었다. 그런데 **두 컬럼의 조합으로 묶는 것**과 **각 컬럼을 기준으로 따로 집계하는 것**은 달랐다.

이 차이에서 시작해 `UNION ALL`, `GROUPING SETS`, `ROLLUP`, `CUBE`까지 Oracle 문법을 기준으로 정리해 봤다.

## 내가 구하고 싶었던 결과

예제로 사용할 `sales` 테이블이다. 상품코드와 판매월은 문자형, 판매수량은 숫자형이라고 가정한다.

| 상품코드 `product_code` | 판매월 `sale_month` | 판매수량 `quantity` |
|---|---|---:|
| X01 | 202501 | 10 |
| X01 | 202501 | 5 |
| X01 | 202502 | 20 |
| X02 | 202501 | 30 |
| Y01 | 202503 | 40 |

여기서 필요한 결과는 다음 두 가지였다.

- **상품코드별 합계**: X01은 35, X02는 30, Y01은 40
- **판매월별 합계**: 202501은 45, 202502는 20, 202503은 40

이 두 종류의 집계를 하나의 결과표에 담고 싶었다.

## GROUP BY에 두 컬럼을 적으면

처음 떠올린 쿼리는 다음과 같다.

```sql
SELECT
    product_code,
    sale_month,
    SUM(quantity) AS total_quantity
FROM sales
GROUP BY product_code, sale_month;
```

이 쿼리는 상품코드와 판매월이 모두 같은 행끼리 묶는다. 따라서 X01의 전체 합계 35가 아니라, 판매월에 따라 나뉜 결과가 나온다.[^select]

| 상품코드 | 판매월 | 판매수량 합계 |
|---|---|---:|
| X01 | 202501 | 15 |
| X01 | 202502 | 20 |
| X02 | 202501 | 30 |
| Y01 | 202503 | 40 |

`GROUP BY`에 컬럼 두 개를 쓰는 것은 가능했다. 내가 원했던 것은 이 조합별 집계와 다른 결과였다.

## 각각 집계하고 UNION ALL로 합치기

원하는 결과를 따로 구해 보면 이해하기 쉽다.

상품코드별로 한 번 집계하고, 판매월별로 한 번 집계한 뒤 두 결과를 합친다.

```sql
SELECT
    product_code,
    NULL AS sale_month,
    SUM(quantity) AS total_quantity
FROM sales
GROUP BY product_code

UNION ALL

SELECT
    NULL AS product_code,
    sale_month,
    SUM(quantity) AS total_quantity
FROM sales
GROUP BY sale_month;
```

두 쿼리는 출력 컬럼 수와 대응하는 데이터 타입을 맞춰야 한다. 이 예제에서는 각 집계에 사용하지 않는 컬럼 자리를 `NULL`로 채웠다.

`UNION`은 중복 행을 제거하고, `UNION ALL`은 중복 제거 없이 결과를 합친다. 여기서는 각각의 집계 결과를 그대로 유지하기 위해 `UNION ALL`을 사용했다.[^union]

## GROUPING SETS로 필요한 집계 기준 지정하기

같은 결과를 `GROUPING SETS`로 표현할 수 있다.

```sql
SELECT
    product_code,
    sale_month,
    SUM(quantity) AS total_quantity
FROM sales
GROUP BY GROUPING SETS (
    (product_code),
    (sale_month)
);
```

여기에는 두 개의 집계 기준이 들어 있다.

- `(product_code)`: 상품코드별 집계
- `(sale_month)`: 판매월별 집계

Oracle은 지정한 기준마다 집계하고, 그 결과들을 `UNION ALL` 방식으로 결합한다. 이 쿼리는 앞에서 두 쿼리로 나누어 작성한 것과 같은 집계 결과를 만든다.[^select]

이해하기 좋게 순서를 정리하면 다음과 같다. 실제 출력 순서를 고정하려면 `ORDER BY`가 필요하다.

| 상품코드 | 판매월 | 판매수량 합계 |
|---|---|---:|
| X01 | NULL | 35 |
| X02 | NULL | 30 |
| Y01 | NULL | 40 |
| NULL | 202501 | 45 |
| NULL | 202502 | 20 |
| NULL | 202503 | 40 |

이때 `NULL`은 해당 행에서 그 컬럼을 집계 기준으로 사용하지 않았음을 나타낸다. 원본 데이터에 들어 있는 실제 `NULL`과 구분해야 한다면 `GROUPING(컬럼)`을 사용할 수 있다. 집계에서 제외된 컬럼에는 1, 집계 기준에 포함된 컬럼에는 0을 반환한다.[^grouping]

## ROLLUP과 CUBE도 집계 기준으로 펼쳐 보기

`ROLLUP`과 `CUBE`도 만들어지는 집계 기준을 펼쳐 보니 이해하기 쉬웠다.

아래에서 A는 상품코드, B는 판매월이다.

| GROUP BY 구문 | 만들어지는 집계 기준 |
|---|---|
| `GROUP BY A, B` | `(A, B)` |
| `GROUP BY GROUPING SETS (A, B)` | `(A)`, `(B)` |
| `GROUP BY ROLLUP(A, B)` | `(A, B)`, `(A)`, `()` |
| `GROUP BY CUBE(A, B)` | `(A, B)`, `(A)`, `(B)`, `()` |

`()`는 전체 데이터를 하나의 그룹으로 집계하는 **전체 합계**를 뜻한다.

`ROLLUP(A, B)`는 상품·월별 합계, 상품별 소계, 전체 합계를 만든다. 오른쪽 컬럼부터 제거하며 집계 범위를 넓히므로 컬럼 순서가 중요하다.

`CUBE(A, B)`는 가능한 모든 집계 조합을 만든다. 따라서 `ROLLUP(A, B)`에 없는 판매월별 합계 `(B)`도 포함한다.[^select]

내가 처음 원했던 것은 상품코드별 합계와 판매월별 합계뿐이었다. 그래서 `(A)`와 `(B)`만 지정하는 `GROUPING SETS`로 요구사항을 표현할 수 있었다.

## ROLLUP에서도 괄호와 위치에 주의하기

다음 세 표현도 구분해서 봐야 한다.

| GROUP BY 구문 | 만들어지는 집계 기준 |
|---|---|
| `GROUP BY ROLLUP(A, B)` | `(A, B)`, `(A)`, `()` |
| `GROUP BY A, ROLLUP(B)` | `(A, B)`, `(A)` |
| `GROUP BY ROLLUP((A, B))` | `(A, B)`, `()` |

`A, ROLLUP(B)`에서는 A가 집계 기준에 계속 남아 있으므로 전체 합계가 만들어지지 않는다.

`ROLLUP((A, B))`에서는 A와 B를 한 묶음으로 취급한다. 따라서 `(A)`만 남는 중간 소계 없이 조합별 집계와 전체 합계만 만들어진다.[^aggregation]

여기서 말하는 집계 기준의 개수는 결과 행의 개수와도 다르다. `(A)`라는 기준 하나에서도 A의 값이 여러 종류라면 여러 행이 나온다.

## 다음에는 결과표부터 그려 보기

처음에는 문법 이름과 괄호 모양을 외우려다 보니 서로 다른 집계 기준이 뒤섞였다.

원하는 결과를 `(상품코드)`, `(판매월)`처럼 먼저 적어 보니 필요한 쿼리가 더 명확해졌다. 다음에 비슷한 문제를 만나면 결과표부터 그려 보고, 어떤 기준의 집계가 필요한지 하나씩 적어 보려고 한다.

[^select]: [Oracle Database 19c SQL Language Reference — SELECT](https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/SELECT.html)
[^union]: [Oracle Database 19c SQL Language Reference — The UNION [ALL], INTERSECT, MINUS Operators](https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/The-UNION-ALL-INTERSECT-MINUS-Operators.html)
[^grouping]: [Oracle Database 19c SQL Language Reference — GROUPING](https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/GROUPING.html)
[^aggregation]: [Oracle Database 19c Data Warehousing Guide — SQL for Aggregation in Data Warehouses](https://docs.oracle.com/en/database/oracle/oracle-database/19/dwhsg/sql-aggregation-data-warehouses.html)
