<template>
    <div class="header">
        <!-- <img src="../assets/msg.png" width="70" height="70"> -->
        <h1>
            <a href="">
                <img src="../assets/msg.png" alt="MSG 관리자" width="70" height="70">
            </a>
        </h1>
        <div id="gnb" style="height: 70px; margin: auto; ">
            <ul>
                <li><a href="">식당 사용자 등록 요청</a></li>
                <li><a href="">유저 신고 접수 내역</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style>
.header h1{
    position:absolute;
    left: 0;
}
.header{
    width: 1050px;
    height: 50px;
    margin: 0 auto;
    position: relative;
}

    #gnb{float:top;}
    #gnb ul li{
    list-style:none;
    width: 200px;
    float: right;
    margin-top: 20px;
}
#gnb ul li a{
    font-size: 17px;
    color: #333333;
    font-weight: bold;
    text-decoration: none;
}
</style>