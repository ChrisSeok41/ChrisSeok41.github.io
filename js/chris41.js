async function postData(url, data) {
    try {
        data.AToken = AToken;
        var response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: new URLSearchParams(data).toString()
        });
      
        var responseBody = await response.text();
      
        if (!response.ok) {
            throw new Error(responseBody);
        }
    
        var body = JSON.parse(responseBody);
        if (body.Code != 0) {
            throw new Error(body.Message);
        }

        return body;

    } catch(e) {
        alert("고객님의 정보 조회 과정에서 문제가 발생하였습니다.\n잠시 후 다시 시도해주세요.\n" + e);
        history.back();
    }
}

function addTableRow(table, data) {
    if(data == null || data.length <= 0) {
        var row = table.insertRow(-1);
        row.innerHTML = '<td colspan=3 style="height:100px;">아직 우편물이 추가되지 않았습니다.<br>관리자에게 우편물 추가를 문의해보세요.</td>';
    } else {
        data.forEach((val, i) => {
            var row = table.insertRow(-1);
            row.innerHTML = '<td>' + (i+1) + '</td><td>' + val.Idt.substring(0, 10) + '</td><td><a href="' + urlyAddrB + val.S + '" class="blklink">' + val.Title + '</a></td>';
        });
    }
}

function openNav() {
    document.getElementById("mySidenav").style.width = "200px";
}

function closeNav() {
    document.getElementById("mySidenav").style.width = "0";
}

function delCheck() {
    var msg = "인증서 삭제 후에는 현재 브라우저에서 사서함 접속이 불가합니다.\n정말 삭제하시겠습니까?";
    if(confirm(msg)) {
        return true;
    } else {
        return false;
    }
}