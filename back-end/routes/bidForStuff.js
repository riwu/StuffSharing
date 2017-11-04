
function bidForStuff(bidDetails){
	var query = "INSERT INTO bid_log (bid_amt, user_id, stuff_id) VALUES (" + 
				bidDetails.bidAmt + ",(SELECT u.id FROM user u WHERE u.username = " + 
                bidDetails.user + "," + bidDetails.stuffId + ")";
    return query;
}

function updateBidLog(bidDetails){
	var query = "UPDATE bid_log b SET b.bid_amt = " + bidDetails.bidAmt + 
	            "WHERE b.stuff_id = " + bidDetails.stuffId + 
	            "AND b.user_id = (SELECT u.id FROM user u WHERE u.username = " + bidDetails.user 
	            + ")";
    return query;
}

function selectBiddingItems(bidDetails){
	var query = "SELECT DISTINCT s.name, u1.username, b.bid_amt FROM stuff s, bid_log b, user u1, user u2
                WHERE b.user_id = (SELECT u2.id FROM user u2 WHERE u2.username = " + bidDetails.user +
                ") AND s.id = " + bidDetails.stuffId + " AND s.owner = u1.id " ;
    return query; 
}

function chooseWinningBid(bidDetails){
	var query = "SELECT DISTINCT u1.username, b.bid_amt FROM stuff s, bid_log b, user u1, user u2
                WHERE b.stuff_id = " + bidDetails.stuffId + " AND u2.id = (SELECT u2.id FROM user u2 WHERE u2.username = "
                + bidDetails.user + " AND u1.id = b.user_id "; 
	return query;
}
function addLoanLog(bidDetails){
	var query = "INSERT INTO loan_log (stuff, borrower, loan_date, price) VALUES (" +
		         bidDetails.stuffId + ", (SELECT u.id FROM user u WHERE u.username = " +
		         bidDetails.user + ")," + bidDetails.loanDate + ", ADDDATE (" +
		         bidDetails.loanDate + ", (SELECT s.max_loan_period FROM stuff s WHERE s.id = " +
		         bidDetails.stuffId + ")), " + bidDetails.bidAmt + ")" ;	
    return query;
}

function deleteBidLogData(bidDetails){
	var query = "DELETE FROM bid_log WHERE stuff_id = " +
	            bidDetails.stuffId + ")" ;
    return query;
}

function updateStuffDetails(stuffDetails){
	var query = "UPDATE stuff s SET s.available_from = ADDDATE (" +
		        stuffDetails.loanDate + ", s.max_loan_period) WHERE s.id = " +
		        stuffDetails.stuffId + ")" ;	
    return query;
}



