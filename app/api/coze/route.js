import { NextResponse } from "next/server";

const cozeApiUrl = "https://api.coze.cn/open_api/v2/chat";

export async function POST(req){

    const token = process.env.COZE_TOKEN
    const converstaion_id = process.env.COZE_CONVERSATION_ID
    const user = process.env.COZE_USER
    const bot_id = process.env.COZE_BOT_ID


    const data = await req.json()
    const query = data.query
    console.log(query)


    const extractJsonFromText = (text) => {
        // 使用正则表达式来匹配JSON字符串
        const jsonRegex = /\{[\s\S]*?\}/;
        const jsonMatch = text.match(jsonRegex);
        
        if (jsonMatch) {
            // 尝试将匹配到的JSON字符串解析为对象
            try {
                const jsonObject = JSON.parse(jsonMatch[0]);
                return jsonObject;
            } catch (error) {
                console.error('无法解析JSON:', error);
            }
        }
        
        // 如果没有找到JSON或者解析失败，返回null
        return null;
    }


    const body = {
        "conversation_id": converstaion_id,
        "bot_id": bot_id,
        "user": user,
        "query": query,
        "stream":false
    }

    const res = await fetch(cozeApiUrl, {
        method: "POST",
        headers: {
            'Accept': '*/*',
            'Host': 'api.coze.cn',
            'Connection': 'keep-alive',
            "Content-Type": "application/json; charset=utf-8",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(body)
    })

    const res_json = await res.json()





    // console.log(res_json.messages[1].content)

    const res_obj = extractJsonFromText(res_json.messages[1].content)

    if(res_obj == null){
        console.log("res_obj is null")
        
        return new NextResponse(JSON.stringify({
            "code": 201,
            "info": "对不起，你的困惑已超出我的智能知识库范围，无法推荐相关视频。"
        }))
    }

    console.log(res_obj)

    return new NextResponse(JSON.stringify({
        "code": 200,
        "info": res_obj
    }))


}