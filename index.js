(function () {

    function Carousel(options) {
        this.imgWidth = options.imgWidth;
        this.imgHeight = options.imgHeight;
        this.wrap = options.wrap;
        this.imgList = options.imgList;
        this.imgList.push(options.imgList[0]);
        this.imgLen = this.imgList.length;
        this.listWidth = this.imgWidth * this.imgLen;
        // 记录当前位置
        this.recordLeft = 0;
        // 小圆点的索引
        this.nowIndex = 0;
        this.flag = false;
        this.createDom();
        this.initStyle();
        this.bindEvent();
        this.slideAuto();
    }
    // 创造dom对象
    Carousel.prototype.createDom = function () {
        let oBox = $('<div class="box"></div>');
        let oImgList = $('<ul class="image-list"></ul>');
        let oLeftBtn = $('<div class="left-btn">&lt;&lt;</div>');
        let oRightBtn = $('<div class="right-btn">&gt;&gt;</div>');
        let oDot = $('<div class="dot"></div>');
        for (let i = 0; i < this.imgLen; i++) {
            $('<li><img src=' + this.imgList[i] + '></li>').appendTo(oImgList);
        }
        for (let i = 0; i < this.imgLen - 1; i++) {
            $('<span></span>').appendTo(oDot);
        }
        oBox.append(oImgList)
            .append(oLeftBtn)
            .append(oRightBtn)
            .append(oDot)
            .appendTo(this.wrap);
    }

    //初始化样式
    Carousel.prototype.initStyle = function () {
        // 计算一个中间值，使小圆点居中
        let margin = (this.imgLen - 1) * 10;
        console.log(this.imgWidth, this.imgLen);
        $('.wrapper > .box > .image-list').css({
            width: this.imgWidth * this.imgLen,
            height: '100%'
        });
        console.log($('.image-list').width());
        $('.wrapper > .box > .image-list > li').css({
            width: this.imgWidth,
            height: this.imgHeight
        });
        $('.dot').css({
            left: 'calc(50% - ' + margin + 'px)'
        })
    }

    // 绑定事件
    Carousel.prototype.bindEvent = function () {
        let self = this;
        $('.left-btn').on('click', () => {
            self.move('prev');
        });
        $('.right-btn').on('click', () => {
            self.move('next');
        });
        $('.dot span').on('click', function () {
            let index = $(this).index();
            // console.log(index);
            self.move(index);
        })
    }

    Carousel.prototype.move = function (direction) {
        if (this.flag) {
            return false;
        }
        this.flag = true;
        switch (direction) {
            case "prev":
                if (this.recordLeft == -this.imgWidth * (this.imgLen - 1)) {
                    $('.image-list').css({
                        left: 0
                    });
                    this.recordLeft = 0;
                }
                $('.image-list').animate({
                    left: '-=' + this.imgWidth + 'px'
                });
                this.recordLeft -= this.imgWidth;
                if(this.nowIndex == 0) {
                    this.nowIndex = this.imgLen - 2;
                }else{
                    this.nowIndex--;
                }
                break;

            case "next":
                if (this.recordLeft == 0) {
                    $('.image-list').css({
                        left: -this.imgWidth * (this.imgLen - 1)
                    });
                    this.recordLeft = -this.imgWidth * (this.imgLen - 1);
                }
                $('.image-list').animate({
                    left: "+=" + this.imgWidth + 'px'
                });
                this.recordLeft += this.imgWidth;
                if(this.nowIndex == this.imgLen - 2) {
                    this.nowIndex = 0;
                }else{
                    this.nowIndex++;
                }
                break;
            default:
                $('.image-list').animate({
                    left: -this.imgWidth * direction
                });
                this.recordLeft = -this.imgWidth * direction;
                this.nowIndex = direction;
        }
        $('.dot span').css({
            backgroundColor: 'orange'
        }).eq(this.nowIndex).css({
            backgroundColor: '#f40'
        });
        this.flag = false;
    }
    // 自动轮播
    Carousel.prototype.slideAuto = function () {
        let self = this;
        clearInterval(this.timer);
        this.timer = setInterval(function () {
            self.move('prev')
        }, 3000)
    }





    // 创建实例方法
    $.fn.extend({
        carousel: function (options) {
            options.wrap = this || $(body);
            options.imgWidth = this.width();
            options.imgHeight = this.height();
            // options 用来接收并保存外界的数据；
            var carousel = new Carousel(options);
            // 链式调用
            return this;
        }
    })

})()