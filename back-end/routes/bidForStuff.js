
function bidForStuff(bidDetails){
	var query = "INSERT INTO bid_log (bid_amt, user_id, stuff_id) VALUES (" + 
				bidDetails.bidAmt + ",(SELECT u.id FROM user u WHERE u.username = " + 
                bidDetails.userID + "," + stuffId
    + ")";
}