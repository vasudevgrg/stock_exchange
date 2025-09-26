import java.utils.*;

class Solution {
    public String firstNonRepeating(String s) {
        HashSet<Character> hs = new HashSet<>();
        HashMap<Character, Integer> hm = new HashMap<>();
        TreeMap<Integer, Character> tm = new TreeMap<>(());
        StringBuilder sb=new StringBuilder();

        for(int i=0;i< s.length();i++) {
            char ch = s.charAt(i);

            if(tm.containsValue(ch)) {
                tm.remove(hm.get(ch));
                Map.Entry<Integer, Character> firstEntry = treeMap.firstEntry();

        if (firstEntry != null) {
            Character firstValue = firstEntry.getValue();
            sb.append(firstValue);
        }else{
             sb.append('#');
        }
            }else{
                tm.put(i, ch);
                hm.put(ch, i);
                sb.append(ch);
            }
        }
        return sb.toString();
    }
}