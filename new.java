class Solution {
    public static int findEquilibrium(int arr[]) {
        int i=0;
        int j= arr.length-1;

        int leftSUm=0;
        int rightSum=0;
        int ans=-1;

        while((j-i)>2)  {
            if(leftSUm>rightSum) {
                rightSum+= arr[j--];
                ans=j;
            }else if(leftSUm<= rightSum) {
                leftSUm+=  arr[i++];
                ans=i;
            }
        }

        if(leftSUm== rightSum) {
            return ans;
        }else{
            return -1;
        }
        
    }
}

