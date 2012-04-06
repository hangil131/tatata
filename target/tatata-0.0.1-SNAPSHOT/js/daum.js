	var map;
	var center = new daum.maps.LatLng(36.5, 128.0);
	
	function make(lv){
		map = new daum.maps.Map(document.getElementById('map'), {
			center: center
		});
		map.setLevel(lv);
	}
	function mark(pos){
		new daum.maps.Marker({ position: pos }).setMap(map);
	}
	function line(list,c,w){
		var line = new daum.maps.Polyline({"strokeColor" : c, "strokeWeight" : w});
		line.setPath(list);
		line.setMap(map);
	}
    function lineAll(path,c,w){
    	path.forEach(function(v,i,a){
    		if(i+1 < a.length) line( [v,a[i+1]], c, w );
    	});
    }
	function markAll(path){
    	path.forEach(function(v){
    		mark(v);
    	});
    }
	
	function convert(path){
		return path.map(function(v){
			return new daum.maps.LatLng(v.lat, v.lgt);
		});
	}
    function markFrom(s,d){
    	var v = graph();
		var t = convert ( getList(v,v[s],v[d]) );
		lineAll(t,'#FF0000',6);
		//markAll(t);
		mark(t[0]);
		mark(t[t.length-1]);
    }
    function lineFrom(s,d){
    	var v = graph();
		var t = convert ( getList(v,v[s],v[d]) );
		lineAll(t,'#0000FF');
		//markAll(t);
    }


    var i=0;
    
    
    function drawMap(){
		make(13);
		lineFrom(0,44);
		lineFrom(45,78);
		lineFrom(79,106);
		lineFrom(11,143);
		
		if($('#src').val()==-1 || $('#dest').val()==-1)
			return;
		
		if(i==0){
			markFrom($('#src').val(),$('#dest').val());
			return;
		}
 		
		markFrom($('#src').val(),$('#inter1').val());
		for(var j=1; j<i; j++)
			markFrom($('#inter'+j).val(),$('#inter'+(j+1)).val());
		markFrom($('#inter'+i).val(),$('#dest').val());
		
    }
    
	function init() {
		make(13);
		drawMap();
		markFrom(0,143);
	}
	
	$(function(){
		버튼체인지이벤트등록();
		버튼클릭이벤트등록();
		
		var availableTags = [
		         			{"label" : "서울", "value" : 0},
		         			{"label" : "천안", "value" : 11},
		         			{"label" : "대전", "value" : 18},
		         			{"label" : "대구", "value" : 31}
		         			];
		         		$( "#tags1" ).autocomplete({
		         			source: availableTags,
		         			select: function(event, ui) {
		         				console.log(ui);
		         			}
		         		});
		         		
	});

	function 버튼체인지이벤트등록(){
		$('#src').change(function(){
			drawMap();
		});
		$('#dest').change(function(){
			drawMap();
		});

	}
	function 버튼클릭이벤트등록(){
		$('#btnInter').click(function(){
			var tag = "경유지 <select id=inter"+ ++i + ">"+
			"<option value=-1>나들목</option>"+
			"<option value=0>한남</option>"+
			"<option value=1>반포</option>"+
			"<option value=2>서초</option>"+
			"<option value=3>양재</option>"+
			"<option value=4>판교</option>"+
			"<option value=5>신갈</option>"+
			"<option value=6>수원</option>"+
			"<option value=7>기흥</option>"+
			"<option value=8>동탄</option>"+
			"<option value=9>오산</option>"+
			"<option value=10>안성</option>"+
			"<option value=11>천안</option>"+
			"<option value=12>목천</option>"+
			"<option value=13>청주</option>"+
			"<option value=14>남이</option>"+
			"<option value=15>청원</option>"+
			"<option value=16>신탄진</option>"+
			"<option value=17>회덕</option>"+
			"<option value=18>대전</option>"+
			"<option value=19>비룡</option>"+
			"<option value=20>옥천</option>"+
			"<option value=21>금강</option>"+
			"<option value=22>영동</option>"+
			"<option value=23>황간</option>"+
			"<option value=24>추풍령</option>"+
			"<option value=25>김천</option>"+
			"<option value=26>구미</option>"+
			"<option value=27>남구미</option>"+
			"<option value=28>왜관</option>"+
			"<option value=29>칠곡</option>"+
			"<option value=30>금호</option>"+
			"<option value=31>북대구</option>"+
			"<option value=32>도동</option>"+
			"<option value=33>동대구</option>"+
			"<option value=34>경산</option>"+
			"<option value=35>영천</option>"+
			"<option value=36>건천</option>"+
			"<option value=37>경주</option>"+
			"<option value=38>언양</option>"+
			"<option value=39>서울산</option>"+
			"<option value=40>통도사</option>"+
			"<option value=41>양산</option>"+
			"<option value=42>노포</option>"+
			"<option value=43>영락</option>"+
			"<option value=44>구서</option>"+
			"</select>"; 

			$('#srcWrap').append(tag);
			
			$('#inter'+i).change(function(){
				if(parseInt($('#inter'+i).val()) <= parseInt($('#src').val()) || parseInt($('#inter'+i).val()) >= parseInt($('#dest').val())){
					alert("올바른 경유지를 입력하세요.");
					return;
				}
				drawMap();
			});
		});
	}