
var qs = document.querySelector.bind(document),
    qsa = document.querySelectorAll.bind(document);
    existing = qsa('.video_speed_cover, .video_speed_container');

if(existing.length){
    existing.forEach(el => el.remove());
}

var ce = document.createElement.bind(document),
    media = qsa('video,audio'),
    active = null,
    body = qs('body'),
    container = ce('div'),
    select = ce('select'),
    range = ce('input'),
    rate = ce('span'),
    cover = ce('div');

var choose = ce('option');
choose.text = 'choose media';
select.appendChild(choose);

for(var i = 0; i < media.length; i++){
    var o = ce('option');
    o.value = i;
    var l = media[i].nodeName == 'VIDEO' ? 'video' : 'audio'
    o.text = `${l}: ${i + 1}`;
    select.appendChild(o)
}

select.onchange = function(){
    var v = this.value;
    if(v){
        setVideo(media[v]);
    }
};

var update = function(speed){
    if(!active){
        return;
    }

    active.playbackRate = speed;
    rate.innerHTML = speed;
};

var setVideo = function(v){
    active = v;
    update(v.playbackRate);
};

range.oninput = function(){
    update(range.value);
};

cover.onclick = function(){
    cover.remove();
    container.remove();
};

if(media.length){
    setVideo(media[0]);
    select.value = 0;
    range.value = media[0].playbackRate;
}

range.type = 'range';
range.min = '.25';
range.max = '10';
range.step = '.25';
select.style.display = 'inline-block';
range.style.display = 'block';
rate.style.display = 'inline-block';
container.style.position = 'fixed';
container.style.top = '1%';
container.style.right = '1%';
container.style.zIndex = '1000000';
container.style.background = 'red';
container.style.borderRadius = '6px';
container.style.padding = '10px';
container.style.textAlign = 'center';
container.classList.add('video_speed_container');
cover.style.position = 'fixed';
cover.style.top = 0;
cover.style.right = 0;
cover.style.bottom = 0;
cover.style.left = 0;
cover.classList.add('video_speed_cover');
container.appendChild(select);
container.appendChild(range);
container.appendChild(rate);
body.appendChild(cover);
body.appendChild(container);
