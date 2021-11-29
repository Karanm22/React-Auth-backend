import axios from "axios"
import { oauthClient } from "./oauthClient"

const getAccessAndBearerTokenUrl = ({accessToken})=>{
    return `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${accessToken}`;

}
export const getGoogleUser = async ({code})=>{
    const {tokens} = await oauthClient.getToken(code)
    console.log(tokens)
    const response = await axios.get(getAccessAndBearerTokenUrl({accessToken:tokens.access_token}),{headers:{Authorization:`Bearer ${tokens.id_token}`}})
    console.log('----------------',response)
    return response.data
}