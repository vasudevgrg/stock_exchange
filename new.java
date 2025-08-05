import java.util.ArrayList;
import java.util.Collections;

class Solution {
    public int numOfUnplacedFruits(int[] fruits, int[] baskets) {
        ArrayList<Integer> arr = new ArrayList<>();
        Collections.addAll(arr, baskets);
        int ans=0;

        for(int i: fruits) {
            int idx = binarySearch(arr, i);
            if(idx>=0) {
                arr.remove(idx);
            }else{
                ans++;
            }
        }
        return ans;
        
    }

    public int binarySearch(ArrayList<Integer> arr, int n) {
        int low=0;
        int high= arr.size();
        
        int result =-1;

        while(low<=high) {
            int mid = (low+high)/2;
            if(arr.get(mid)>=n) {
                high = mid-1;
            } else{
                result = mid;
                low = mid+1;
            }
        }
        return result;
    }
}