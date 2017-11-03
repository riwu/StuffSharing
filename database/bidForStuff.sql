-- 1. bidder place bidding amt
-- input: bidamt, username, stuffid
-- insert bid_log
INSERT INTO bid_log (bid_amt, user_id, stuff_id) 
VALUES (bidamt,(SELECT u.id FROM user u WHERE u.username = username), stuffid);

-- TEST CASE: working!
/*INSERT INTO bid_log (bid_amt, user_id, stuff_id) 
VALUES (80,(SELECT u.id FROM user u WHERE u.username = 'Tijn'), 10);*/

-- update bid_log
UPDATE bid_log b
SET b.bid_amt = bidamt
WHERE b.stuff_id = stuffid 
AND b.user_id = (SELECT u.id FROM user u WHERE u.username = username);

-- TEST CASE: working! 
/*UPDATE bid_log b
SET b.bid_amt = 90
WHERE b.stuff_id = 10
AND b.user_id = (SELECT u.id FROM user u WHERE u.username = 'Tijn');*/

-- 2. bidder see all biding items
-- input: username
-- u1: bidder u2: owner
SELECT DISTINCT s.name, u1.username, b.bid_amt
FROM stuff s, bid_log b, user u1, user u2
WHERE b.user_id = (SELECT u2.id FROM user u2 WHERE u2.username = username)
AND s.id = b.stuff_id
AND s.owner = u1.id;

-- TEST CASE: working! 
/*SELECT DISTINCT s.name, u1.username, b.bid_amt
FROM stuff s, bid_log b, user u1, user u2
WHERE b.user_id = (SELECT u2.id FROM user u2 WHERE u2.username = 'Ronstring')
AND s.id = b.stuff_id
AND s.owner = u1.id;*/

-- 3. owner can see stuff bidding amt
-- input: username, stuffid
-- u1: bidder u2: owner
SELECT DISTINCT u1.username, b.bid_amt
FROM stuff s, bid_log b, user u1, user u2
WHERE b.stuff_id = stuffid
AND u2.id = (SELECT u2.id FROM user u2 WHERE u2.username = username)
AND u1.id = b.user_id;

-- TEST CASE: working! 
/*SELECT DISTINCT u1.username, b.bid_amt
FROM stuff s, bid_log b, user u1, user u2
WHERE b.stuff_id = '2'
AND u2.id = (SELECT u2.id FROM user u2 WHERE u2.username = 'Rank')
AND u1.id = b.user_id;*/

-- 4. bidder get the product
-- input: username, stuffid, loandate,bitamt
-- insert loan_log
INSERT INTO loan_log (stuff, borrower, loan_date, price) 
VALUES (stuffid,
(SELECT u.id FROM user u WHERE u.username = username),
loandate,
ADDDATE (loanDate,(SELECT s.max_loan_period FROM stuff s WHERE s.id = stuffid)),
bitamt
);
-- TEST CASE: working! 
/*INSERT INTO loan_log (stuff, borrower, loan_date, return_date, price) 
VALUES ('10',(SELECT u.id FROM user u WHERE u.username = 'Tijn'),'2018-03-21',
ADDDATE('2018-03-21',(SELECT s.max_loan_period FROM stuff s WHERE s.id = '10')),
'90'
);*/

-- update bid_log 
DELETE FROM bid_log
WHERE stuff_id = stuffid;

-- TEST CASE: WORKING!
/*DELETE FROM bid_log
WHERE stuff_id = '10';*/

-- update stuff 
UPDATE stuff s
SET s.available_from = DATE_ADD(loanDate, INTERVAL max_loan_period DAY)
WHERE s.id = stuff; 

-- TEST CASE: WORKING! 
/*UPDATE stuff s
SET s.available_from = ADDDATE('2018-03-21', s.max_loan_period)
WHERE s.id = '10'; */


