# vdo
> 一个基于vue-cli,axios,stylus的勉强算它个webapp吧，初次在router-view上使用transition。

## 项目简介
> 一个关于电影的项目吧，和以往不同的是这次的数据来源豆瓣的线上接口。

## API请求转发配置
  <ol>
    <li>打开<code> http://api.douban.com/v2/movie/in_theaters </code>查看接口数据，留意此地址。</li>
    <li>在<code> ./config/index.js </code>中的 proxyTable 配置代理：<p></p>
    <div class="highlight highlight-source-js"><pre>proxyTable<span class="pl-k">:</span> {
    <span class="pl-s"><span class="pl-pds">'</span>/api<span class="pl-pds">'</span></span><span class="pl-k">:</span> {
        target<span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span>http://api.douban.com/v2<span class="pl-pds">'</span></span>,
        changeOrigin<span class="pl-k">:</span> <span class="pl-c1">true</span>,
        pathRewrite<span class="pl-k">:</span> {
            <span class="pl-s"><span class="pl-pds">'</span>^/api<span class="pl-pds">'</span></span><span class="pl-k">:</span> <span class="pl-s"><span class="pl-pds">'</span><span class="pl-pds">'</span></span>
        }
    }
}</pre></div></li>
    <li>重新启动 npm run dev，打开 localhost:8080/api/movie/in_theaters 查看结果是否与直接请求豆瓣 API 相同。</li>
    <li>本例中使用了以下 API：
      <ul>
      <li><code>/movie/search?q={text}</code>电影搜索api；</li>
      <li><code>/movie/in_theaters</code>正在热映中的电影；</li>
      <li><code>/movie/coming_soon</code>即将上映的电影；</li>
      <li><code>/movie/subject/:id</code>具体电影的相关信息</li>
      </ul>
    </li>
  </ol>

## Tips
切忌合理操作接口访问，由于过于频繁的调用豆瓣对外的接口，现如今我的IP已经被拉黑，只有隔不知道多久的时间才能勉强的访问。

## 技术栈
>webpack,es6,vue2.0,vue-router,axios,stylus
